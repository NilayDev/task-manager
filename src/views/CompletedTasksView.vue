<script setup lang="ts">
import { useTaskStore } from '@/stores/task'
import TaskCard from '@/components/TaskCard.vue'
import type { Task } from '@/stores/task'

const taskStore = useTaskStore()

const handleToggleTask = (id: number): void => {
  taskStore.toggleTask(id)
}

const handleDeleteTask = (id: number): void => {
  taskStore.deleteTask(id)
}
</script>

<template>
  <div class="max-w-2xl mx-auto">
    <h2 class="text-2xl font-bold mb-6">Completed Tasks</h2>
    
    <div class="space-y-4">
      <TransitionGroup
        name="list"
        tag="div"
        class="space-y-4"
      >
        <TaskCard
          v-for="task in taskStore.completedTasks"
          :key="task.id"
          :task="task"
          :hide-actions="true"
          @toggle="handleToggleTask(task.id)"
          @delete="handleDeleteTask(task.id)"
        />
      </TransitionGroup>
      
      <div
        v-if="taskStore.completedTasks.length === 0"
        class="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-sm"
      >
        <svg
          class="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p class="text-gray-500 dark:text-gray-400">
          No completed tasks yet. Complete some tasks to see them here!
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-move {
  transition: transform 0.3s ease;
}
</style> 