<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router'
import { useTaskStore } from '@/stores/task'

const taskStore = useTaskStore()
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <header class="bg-white dark:bg-gray-800 shadow">
      <nav class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <h1 class="text-2xl font-bold text-primary-600 dark:text-primary-400">
            Task Manager
          </h1>
          
          <div class="flex items-center space-x-4">
            <RouterLink 
              to="/" 
              class="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
              active-class="text-primary-600 dark:text-primary-400 font-medium"
            >
              All Tasks
            </RouterLink>
            <RouterLink 
              to="/pending" 
              class="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
              active-class="text-primary-600 dark:text-primary-400 font-medium"
            >
              Pending
              <span class="ml-1 text-sm bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded-full">
                {{ taskStore.pendingTasks.length }}
              </span>
            </RouterLink>
            <RouterLink 
              to="/completed" 
              class="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
              active-class="text-primary-600 dark:text-primary-400 font-medium"
            >
              Completed
              <span class="ml-1 text-sm bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded-full">
                {{ taskStore.completedTasks.length }}
              </span>
            </RouterLink>
          </div>
        </div>
      </nav>
    </header>

    <main class="container mx-auto px-4 py-8">
      <RouterView />
    </main>
  </div>
</template> 