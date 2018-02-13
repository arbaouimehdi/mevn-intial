<template>
  <div class="list">
    <h1>Update Post {{ title }}</h1>
    <h4><router-link v-bind:to="{ name: 'Posts' }">Posts List</router-link></h4>
    <div>
      <select v-model="selected">
        <option value="">Please select one</option>
        <option v-for="category in categories" v-bind:value="category._id">{{ category.name }}</option>
      </select>
    </div>
    <div>
      <input type="text" name="title" v-model="title">
    </div>
    <div>
      <textarea name="" id="description" cols="30" rows="10" v-model="description"></textarea>
    </div>
    <div>
      <button @click="updatePost">Update</button>
    </div>
  </div>
</template>

<script>
  import PostsService from '@/services/PostsService';
  import CategoriesService from '@/services/CategoriesService';

  export default {
    name: 'EditPost',
    data() {
      return {
        title: '',
        description: '',
        categories: '',
        selected: ''
      }
    },
    mounted() {
      this.getPost();
      this.getCategories();
    },
    methods: {
      async getPost() {
        const response = await PostsService.getPost({
          id: this.$route.params.id
        });
        this.title = response.data.title;
        this.description = response.data.description;
        this.selected = response.data.category;
      },
      async updatePost() {
        await PostsService.updatePost({
          id: this.$route.params.id,
          title: this.title,
          description: this.description,
          category: this.selected,
        });
        this.$router.push({ name: 'Posts' })
      },
      async getCategories() {
        const response = await CategoriesService.fetchCategories();
        this.categories = response.data;
      }
    }
  }
</script>

<style>
  .list {
    text-align: left;
  }
  div {
    margin: 10px 0;
  }
</style>