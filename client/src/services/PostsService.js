import Api from '@/services/Api';

export default {
  fetchPosts() {
    return Api().get('/');
  },
  addPost(params) {
    return Api().post('/', params);
  },
  getPost(params) {
    return Api().get(`/${params.id}`)
  },
  updatePost(params) {
    return Api().put(`/${params.id}`, params);
  },
  deletePost(id) {
    return Api().delete(`${id}`);
  }
}