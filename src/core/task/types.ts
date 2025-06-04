export interface Task {
  id: number
  title: string
  completed: boolean
  createdAt: Date
}

export interface TaskState {
  tasks: Task[]
  nextId: number
}

export interface TaskValidationResult {
  isValid: boolean
  error?: string
}

export interface TaskManager {
  getTasks(): Task[]
  getTask(id: number): Task | undefined
  addTask(title: string): Task
  updateTask(id: number, title: string): Task | undefined
  toggleTask(id: number): Task | undefined
  deleteTask(id: number): boolean
  getCompletedTasks(): Task[]
  getPendingTasks(): Task[]
  getTotalTasks(): number
  validateTask(title: string, existingTasks: Task[], taskId?: number): TaskValidationResult
} 