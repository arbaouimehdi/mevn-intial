import Api from '@/services/Api';

export default {
  fetchCategories(){
    return Api().get('/categories');
  },
  fetchCategory(id) {
    return Api().get(`/category/${id}`);
  }
}