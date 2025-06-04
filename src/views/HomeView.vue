<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTaskStore } from '@/stores/task'
import TaskCard from '@/components/TaskCard.vue'
import TaskForm from '@/components/TaskForm.vue'
import ConfirmDialog from '@/components/ConfirmDialog.vue'
import type { Task } from '@/stores/task'

const taskStore = useTaskStore()
const showAddForm = ref(false)
const showDeleteConfirm = ref(false)
const taskToDelete = ref<Task | null>(null)

/**
 * Computed properties for task lists and statistics
 */
const pendingTasks = computed(() => taskStore.pendingTasks)
const completedTasks = computed(() => taskStore.completedTasks)
const totalTasks = computed(() => taskStore.totalTasks)
const completedCount = computed(() => taskStore.completedTasks.length)
const pendingCount = computed(() => taskStore.pendingTasks.length)

/**
 * Handles adding a new task
 * @param {string} title - The title of the new task
 */
const handleAddTask = (title: string) => {
  taskStore.addTask(title)
  showAddForm.value = false
}

/**
 * Handles toggling a task's completion status
 * @param {Task} task - The task to toggle
 */
const handleToggleTask = (task: Task) => {
  taskStore.toggleTask(task.id)
}

/**
 * Handles updating a task's title
 * @param {Task} task - The task to update
 * @param {string} title - The new title for the task
 */
const handleUpdateTask = (task: Task, title: string) => {
  taskStore.updateTask(task.id, title)
}

/**
 * Initiates the delete confirmation flow for a task
 * @param {Task} task - The task to delete
 */
const handleDeleteRequest = (task: Task) => {
  taskToDelete.value = task
  showDeleteConfirm.value = true
}

/**
 * Confirms and executes the task deletion
 */
const confirmDelete = () => {
  if (taskToDelete.value) {
    taskStore.deleteTask(taskToDelete.value.id)
    taskToDelete.value = null
  }
  showDeleteConfirm.value = false
}

/**
 * Cancels the task deletion
 */
const cancelDelete = () => {
  taskToDelete.value = null
  showDeleteConfirm.value = false
}
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-4xl mx-auto">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Task Manager</h1>
        <button
          v-if="!showAddForm"
          @click="showAddForm = true"
          class="btn btn-primary"
        >
          Add Task
        </button>
      </div>

      <div v-if="showAddForm" class="mb-8">
        <TaskForm
          @submit="handleAddTask"
          @cancel="showAddForm = false"
        />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Pending Tasks
          </h2>
          <div class="space-y-4">
            <TaskCard
              v-for="task in pendingTasks"
              :key="task.id"
              :task="task"
              @toggle="handleToggleTask(task)"
              @delete="handleDeleteRequest(task)"
              @update="(title) => handleUpdateTask(task, title)"
            />
            <p
              v-if="pendingTasks.length === 0"
              class="text-gray-500 dark:text-gray-400 text-center py-4"
            >
              No pending tasks
            </p>
          </div>
        </div>

        <div>
          <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Completed Tasks
          </h2>
          <div class="space-y-4">
            <TaskCard
              v-for="task in completedTasks"
              :key="task.id"
              :task="task"
              :hide-actions="true"
              @toggle="handleToggleTask(task)"
            />
            <p
              v-if="completedTasks.length === 0"
              class="text-gray-500 dark:text-gray-400 text-center py-4"
            >
              No completed tasks
            </p>
          </div>
        </div>
      </div>

      <div class="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <h3 class="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
          Task Statistics
        </h3>
        <div class="grid grid-cols-3 gap-4">
          <div class="text-center">
            <p class="text-sm text-gray-500 dark:text-gray-400">Total Tasks</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">
              {{ totalTasks }}
            </p>
          </div>
          <div class="text-center">
            <p class="text-sm text-gray-500 dark:text-gray-400">Completed</p>
            <p class="text-2xl font-bold text-green-600 dark:text-green-400">
              {{ completedCount }}
            </p>
          </div>
          <div class="text-center">
            <p class="text-sm text-gray-500 dark:text-gray-400">Pending</p>
            <p class="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {{ pendingCount }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <ConfirmDialog
      :is-open="showDeleteConfirm"
      title="Delete Task"
      :message="taskToDelete ? `Are you sure you want to delete the task '${taskToDelete.title}'? This action cannot be undone.` : ''"
      confirm-text="Delete"
      cancel-text="Cancel"
      @confirm="confirmDelete"
      @cancel="cancelDelete"
    />
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