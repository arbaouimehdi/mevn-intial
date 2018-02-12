<template>
  <div class="list">
    <h1>Add New Post</h1>
    <h4><router-link v-bind:to="{ name: 'Posts' }">Posts List</router-link></h4>
    <div>
      <input type="text" name="title" v-model="title">
    </div>
    <div>
      <input type="text" name="description" v-model="description">
    </div>
    <div>
      <button @click="addPost">Save</button>
    </div>
  </div>
</template>

<script>
  import PostsService from '@/services/PostsService';
  export default {
    name: 'NewPost',
    data() {
      return {
        title: '',
        description: '',
      }
    },
    methods: {
      async addPost() {
        console.log(this.category);
        await PostsService.addPost({
          category: this._category,
          title: this.title,
          description: this.description,
        });
        this.$router.push({ name: 'Posts' });
      }
    }
  }
</script>

<style>
  .list {
    text-align: left;
  }
</style>