import RepoLayoutView from '@/views/repo/RepoLayoutView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
      props: (route) => ({ page: parseInt(route.query.page) || 1 }),
      meta: {
        title: 'Home',
        description: 'This is the home page'
      }
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/repos/:name/:id',
      name: 'RepoLayout',
      props: true,
      component: RepoLayoutView,
      children: [
        {
          path: '',
          name: 'SingleRepoView',
          component: () => import('../views/SingleRepo.vue')
        },
        {
          path: 'details',
          name: 'RepoDetails',
          component: () => import('../views/RepoDetailsView.vue')
        }
      ]
    },
    {
      path: '/repo/:afterEvent(.*)',
      redirect: (to) => {
        return { path: '/repo/' + to.params.afterEvent }
      }
    },
    // {
    //   path: '/help',
    //   name: 'help',
    //   component: () => import('../views/HelpView.vue')
    // },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue')
    },
    {
      path: '/404/:resource',
      name: '404Resource',
      component: () => import('../views/NotFoundView.vue'),
      props: true
    },
    {
      path: '/network-error',
      name: 'NetworkError',
      component: () => import('../views/NetworkErrorView.vue')
    }
  ]
})

export default router
