<template>
  <div class="list">
    <h1>Add New Post</h1>
    <h4><router-link v-bind:to="{ name: 'Posts' }">Posts List</router-link></h4>
    <select v-model="selected">
      <option value="">Please select one</option>
      <option v-for="category in categories" v-bind:value="category._id">{{ category.name }}</option>
    </select>
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
  import CategoriesService from '@/services/CategoriesService';

  export default {
    name: 'NewPost',
    data() {
      return {
        title: '',
        description: '',
        categories: '',
        selected: ''
      }
    },
    mounted() {
      this.getCategories();
    },
    methods: {
      async addPost() {
        await PostsService.addPost({
          category: this.selected,
          title: this.title,
          description: this.description,
        });
        this.$router.push({ name: 'Posts' });
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