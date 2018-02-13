// Dependencies
import Vue from 'vue'
import Router from 'vue-router'

// Components
import Posts from '@/components/Posts';
import NewPost from '@/components/NewPost';
import EditPost from '@/components/EditPost'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/posts',
      name: 'Posts',
      component: Posts
    },
    {
      path: '/new',
      name: 'NewPost',
      component: NewPost
    },
    {
      path: '/edit/:id',
      name: 'EditPost',
      component: EditPost
    }
  ]
})
