<script setup lang="ts">
import { ref } from 'vue'
import type { Task } from '@/stores/task'
import TaskForm from './TaskForm.vue'

/**
 * Props for the TaskCard component
 * @property {Task} task - The task to display
 * @property {boolean} [hideActions] - Whether to hide the action buttons
 */
const props = defineProps<{
  task: Task
  hideActions?: boolean
}>()

/**
 * Component events
 * @event toggle - Emitted when the task completion status is toggled
 * @event delete - Emitted when the delete button is clicked
 * @event update - Emitted when the task is updated with a new title
 */
const emit = defineEmits<{
  (e: 'toggle'): void
  (e: 'delete'): void
  (e: 'update', title: string): void
}>()

const isEditing = ref(false)

/**
 * Handles the toggle action for the task
 */
const handleToggle = () => {
  emit('toggle')
}

/**
 * Handles the delete action for the task
 */
const handleDelete = () => {
  emit('delete')
}

/**
 * Initiates the editing mode for the task
 */
const startEditing = () => {
  isEditing.value = true
}

/**
 * Handles the task update with a new title
 * @param {string} title - The new title for the task
 */
const handleUpdate = (title: string) => {
  emit('update', title)
  isEditing.value = false
}

/**
 * Cancels the editing mode
 */
const cancelEdit = () => {
  isEditing.value = false
}
</script>

<template>
  <div
    class="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
    :class="{ 'opacity-75': task.completed }"
  >
    <div class="p-4">
      <div v-if="isEditing" class="mb-2">
        <TaskForm
          :initial-title="task.title"
          :task-id="task.id"
          @submit="handleUpdate"
          @cancel="cancelEdit"
        />
      </div>
      <div v-else class="flex items-center gap-4">
        <button
          @click="handleToggle"
          class="flex-shrink-0 w-6 h-6 rounded-full border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center transition-colors duration-200"
          :class="{
            'bg-primary-500 border-primary-500': task.completed,
            'hover:border-primary-500 dark:hover:border-primary-400': !task.completed
          }"
        >
          <svg
            v-if="task.completed"
            class="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </button>
        
        <span
          class="flex-1 text-gray-900 dark:text-gray-100 transition-all duration-200"
          :class="{ 'line-through text-gray-500': task.completed }"
        >
          {{ task.title }}
        </span>
        
        <div v-if="!props.hideActions" class="flex items-center gap-2">
          <button
            @click="startEditing"
            class="btn btn-secondary text-sm"
            :disabled="task.completed"
          >
            Edit
          </button>
          <button
            @click="handleDelete"
            class="btn btn-secondary text-sm text-red-600 hover:bg-red-100 dark:hover:bg-red-900"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template> 