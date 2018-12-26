import Vue from 'vue';
import Router from 'vue-router';
import Ebook from './components/Ebook';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/',
    redirect: 'ebook'
  },
  {
    path: '/ebook',
    name: 'Ebook',
    component: Ebook
  }
    // {
    //   path: '/ebook',
    //   name: 'Ebook',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
});
