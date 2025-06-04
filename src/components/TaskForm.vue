<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTaskStore } from '@/stores/task'
import type { Task } from '@/core/task/types'

const props = defineProps<{
  initialTitle?: string
  taskId?: number
}>()

const emit = defineEmits<{
  (e: 'submit', title: string): void
  (e: 'cancel'): void
}>()

const taskStore = useTaskStore()
const title = ref(props.initialTitle || '')
const error = ref<string | null>(null)
const isSubmitting = ref(false)

const validateTitle = () => {
  const result = taskStore.taskManager.validateTask(
    title.value,
    taskStore.tasks,
    props.taskId
  )
  error.value = result.error || null
  return result.isValid
}

const handleSubmit = () => {
  isSubmitting.value = true
  if (validateTitle()) {
    emit('submit', title.value)
    title.value = ''
    error.value = null
  }
  isSubmitting.value = false
}

const handleCancel = () => {
  title.value = ''
  error.value = null
  emit('cancel')
}

const handleInput = () => {
  validateTitle()
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="relative">
    <div class="flex flex-col sm:flex-row gap-2">
      <input
        v-model="title"
        type="text"
        placeholder="Add a new task..."
        class="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        :class="{ 'border-red-500 focus:ring-red-500': error }"
        @input="handleInput"
        @keyup.esc="handleCancel"
      />
      <div class="flex gap-2">
        <button
          type="submit"
          class="btn btn-primary text-sm whitespace-nowrap"
          :disabled="isSubmitting"
        >
          {{ taskId ? 'Update' : 'Add' }}
        </button>
        <button
          type="button"
          @click="handleCancel"
          class="btn btn-secondary text-sm whitespace-nowrap"
          :disabled="isSubmitting"
        >
          Cancel
        </button>
      </div>
    </div>
    <p v-if="error" class="absolute -bottom-6 left-0 text-sm text-red-500">{{ error }}</p>
  </form>
</template> 