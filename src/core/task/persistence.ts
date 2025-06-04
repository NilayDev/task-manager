import type { TaskState } from './types'

const STORAGE_KEY = 'task-manager-data'

export class TaskPersistence {
  static saveState(state: TaskState): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }

  static loadState(): TaskState | null {
    const savedState = localStorage.getItem(STORAGE_KEY)
    if (savedState) {
      const parsed = JSON.parse(savedState)
      // Convert string dates back to Date objects
      parsed.tasks = parsed.tasks.map((task: any) => ({
        ...task,
        createdAt: new Date(task.createdAt)
      }))
      return parsed
    }
    return null
  }

  static clearState(): void {
    localStorage.removeItem(STORAGE_KEY)
  }
} 