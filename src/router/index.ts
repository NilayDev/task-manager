import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CompletedTasksView from '../views/CompletedTasksView.vue'
import PendingTasksView from '../views/PendingTasksView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'All Tasks'
      }
    },
    {
      path: '/completed',
      name: 'completed',
      component: CompletedTasksView,
      meta: {
        title: 'Completed Tasks'
      }
    },
    {
      path: '/pending',
      name: 'pending',
      component: PendingTasksView,
      meta: {
        title: 'Pending Tasks'
      }
    }
  ]
})

// Update document title
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | Task Manager`
  next()
})

export default router 