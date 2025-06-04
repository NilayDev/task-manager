<script setup lang="ts">
import { useTaskStore } from '@/stores/task'
import TaskCard from '@/components/TaskCard.vue'
import TaskForm from '@/components/TaskForm.vue'
import type { Task } from '@/stores/task'
import { ref } from 'vue'

const taskStore = useTaskStore()
const showAddForm = ref(false)

const handleAddTask = (title: string) => {
  taskStore.addTask(title)
  showAddForm.value = false
}

const handleToggleTask = (id: number) => {
  taskStore.toggleTask(id)
}

const handleDeleteTask = (id: number) => {
  taskStore.deleteTask(id)
}

const handleUpdateTask = (id: number, title: string) => {
  const updatedTask = taskStore.updateTask(id, title)
  if (!updatedTask) {
    console.error('Failed to update task:', id)
  }
}
</script>

<template>
  <div class="max-w-2xl mx-auto">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold">Pending Tasks</h2>
    </div>

    <TaskForm
      v-if="showAddForm"
      @submit="handleAddTask"
      @cancel="showAddForm = false"
    />
    
    <div class="space-y-4">
      <TransitionGroup
        name="list"
        tag="div"
        class="space-y-4"
      >
        <TaskCard
          v-for="task in taskStore.pendingTasks"
          :key="task.id"
          :task="task"
          @toggle="handleToggleTask(task.id)"
          @delete="handleDeleteTask(task.id)"
          @update="(title) => handleUpdateTask(task.id, title)"
        />
      </TransitionGroup>
      
      <div
        v-if="taskStore.pendingTasks.length === 0"
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
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <p class="text-gray-500 dark:text-gray-400">
          No pending tasks. Add a new task from the home page!
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