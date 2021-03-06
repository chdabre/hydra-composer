import Vue from 'vue';
import VueRouter from 'vue-router';
import Editor from '@/views/Editor';
import Projects from '@/views/projects/Projects';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Projects',
    component: Projects,
  },
  {
    path: '/edit/:id',
    name: 'Editor',
    component: Editor,
    props: true,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
