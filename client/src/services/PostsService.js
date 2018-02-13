import Api from '@/services/Api';

export default {
  fetchPosts() {
    return Api().get('/posts');
  },
  addPost(params) {
    return Api().post('/posts', params);
  },
  getPost(params) {
    return Api().get(`/post/${params.id}`)
  },
  updatePost(params) {
    return Api().put(`/post/${params.id}`, params);
  },
  deletePost(id) {
    return Api().delete(`/post/${id}`);
  }
}