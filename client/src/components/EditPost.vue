<template>
  <div class="list">
    <h1>Update Post {{ title }}</h1>
    <div>
      <input type="text" name="title" v-model="title">
    </div>
    <div>
      <input type="text" name="title" v-model="description">
    </div>
    <div>
      <button @click="updatePost">Update</button>
    </div>
  </div>
</template>

<script>
  import PostsService from '@/services/PostsService';
  export default {
    name: 'EditPost',
    data() {
      return {
        title: '',
        description: '',
      }
    },
    mounted() {
      this.getPost();
    },
    methods: {
      async getPost() {
        const response = await PostsService.getPost({
          id: this.$route.params.id
        });
        this.title = response.data.title;
        this.description = response.data.description;
      },
      async updatePost() {
        await PostsService.updatePost({
          id: this.$route.params.id,
          title: this.title,
          description: this.description
        });
        this.$router.push({ name: 'Posts' })
      }
    }
  }
</script>

<style>
  .list {
    text-align: left;
  }
</style>