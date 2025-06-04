import type { Task, TaskState, TaskValidationResult, TaskManager } from './types'

export class TaskManagerImpl implements TaskManager {
  private state: TaskState

  constructor(initialState?: TaskState) {
    this.state = initialState || {
      tasks: [],
      nextId: 1
    }
  }

  getTasks(): Task[] {
    return this.state.tasks
  }

  getTask(id: number): Task | undefined {
    return this.state.tasks.find(task => task.id === id)
  }

  addTask(title: string): Task {
    const task: Task = {
      id: this.state.nextId++,
      title,
      completed: false,
      createdAt: new Date()
    }
    this.state.tasks.push(task)
    return task
  }

  updateTask(id: number, title: string): Task | undefined {
    const task = this.getTask(id)
    if (task) {
      const trimmedTitle = title.trim()
      task.title = trimmedTitle
    }
    return task
  }

  toggleTask(id: number): Task | undefined {
    const task = this.getTask(id)
    if (task) {
      task.completed = !task.completed
    }
    return task
  }

  deleteTask(id: number): boolean {
    const index = this.state.tasks.findIndex(task => task.id === id)
    if (index !== -1) {
      this.state.tasks.splice(index, 1)
      return true
    }
    return false
  }

  getCompletedTasks(): Task[] {
    return this.state.tasks.filter(task => task.completed)
  }

  getPendingTasks(): Task[] {
    return this.state.tasks.filter(task => !task.completed)
  }

  getTotalTasks(): number {
    return this.state.tasks.length
  }

  validateTask(title: string, existingTasks: Task[], taskId?: number): TaskValidationResult {
    const trimmedTitle = title.trim()
    
    if (!trimmedTitle) {
      return {
        isValid: false,
        error: 'Task title is required'
      }
    }

    if (trimmedTitle.length > 100) {
      return {
        isValid: false,
        error: 'Task title must be less than 100 characters'
      }
    }

    const isDuplicate = existingTasks.some(task => {
      if (taskId && task.id === taskId) return false
      return task.title === trimmedTitle
    })

    if (isDuplicate) {
      return {
        isValid: false,
        error: 'A task with this title already exists'
      }
    }

    return { isValid: true }
  }

  getState(): TaskState {
    return this.state
  }

  setState(state: TaskState): void {
    this.state = state
  }
} 