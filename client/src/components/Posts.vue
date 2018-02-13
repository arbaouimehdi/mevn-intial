<template>
  <div class="list">
    <h1>Posts List</h1>
    <h4><router-link v-bind:to="{ name: 'NewPost' }">Add New Post</router-link></h4>
    <ul>
      <li v-for="post in posts">
        {{ post.title }} -
        <b>{{ post.category.name }}</b>
        <p>
          {{ post.description }}
          <a href="" @click="deletePost(post._id)">Delete</a>
          <router-link v-bind:to="{ name: 'EditPost', params: { id: post._id } }">Edit</router-link>
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
  import PostsService from '@/services/PostsService'
  import CategoriesService from '@/services/CategoriesService';
  
  export default {
    data() {
      return {
        posts: [],
      }
    },
    mounted() {
      this.getPosts();
    },
    methods: {
      async getPosts() {
        const response = await PostsService.fetchPosts();
        this.posts = response.data;
      },
      async deletePost(id) {
        await PostsService.deletePost(id);
        this.router.push({ name: 'Posts' })
      }
    }
  }
</script>

<style>
  .list {
    text-align: left;
  }
  b {
    background: #444;
    font-size: 10px;
    color: #fff;
    border-radius: 5px;
    padding: 2px 6px;
  }
</style>