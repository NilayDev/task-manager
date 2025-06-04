<script setup lang="ts">
import { useTaskStore } from '@/stores/task'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const taskStore = useTaskStore()
const route = useRoute()

const isActive = (path: string) => route.path === path

const navItems = computed(() => [
  {
    path: '/',
    label: 'All Tasks',
    count: taskStore.totalTasks,
    icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>`
  },
  {
    path: '/pending',
    label: 'Pending',
    count: taskStore.pendingTasks.length,
    icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>`
  },
  {
    path: '/completed',
    label: 'Completed',
    count: taskStore.completedTasks.length,
    icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>`
  }
])
</script>

<template>
  <nav class="bg-white dark:bg-gray-800 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex">
          <div class="flex-shrink-0 flex items-center">
            <h1 class="text-xl font-bold text-gray-900 dark:text-gray-100">
              Task Manager
            </h1>
          </div>
        </div>
        
        <div class="flex space-x-4">
          <router-link
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            class="inline-flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            :class="[
              isActive(item.path)
                ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            ]"
          >
            <span class="flex items-center gap-2">
              <span v-html="item.icon" class="flex-shrink-0"></span>
              <span>{{ item.label }}</span>
              <span
                class="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                :class="[
                  isActive(item.path)
                    ? 'bg-primary-200 dark:bg-primary-800 text-primary-800 dark:text-primary-200'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                ]"
              >
                {{ item.count }}
              </span>
            </span>
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template> 