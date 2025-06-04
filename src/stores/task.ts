import { defineStore } from 'pinia'
import { TaskManagerImpl } from '@/core/task/TaskManager'
import { TaskPersistence } from '@/core/task/persistence'
import type { Task } from '@/core/task/types'

export type { Task } from '@/core/task/types'

export const useTaskStore = defineStore('task', {
  state: () => {
    const taskManager = new TaskManagerImpl(TaskPersistence.loadState() || undefined)
    return {
      taskManager
    }
  },

  getters: {
    tasks: (state) => state.taskManager.getTasks(),
    completedTasks: (state) => state.taskManager.getCompletedTasks(),
    pendingTasks: (state) => state.taskManager.getPendingTasks(),
    totalTasks: (state) => state.taskManager.getTotalTasks()
  },

  actions: {
    addTask(title: string) {
      const task = this.taskManager.addTask(title)
      TaskPersistence.saveState(this.taskManager.getState())
      return task
    },

    toggleTask(id: number) {
      const task = this.taskManager.toggleTask(id)
      if (task) {
        TaskPersistence.saveState(this.taskManager.getState())
      }
      return task
    },

    deleteTask(id: number) {
      const success = this.taskManager.deleteTask(id)
      if (success) {
        TaskPersistence.saveState(this.taskManager.getState())
      }
      return success
    },

    updateTask(id: number, title: string) {
      const task = this.taskManager.updateTask(id, title)
      if (task) {
        TaskPersistence.saveState(this.taskManager.getState())
      }
      return task
    }
  }
}) 