import type { Task } from '@/stores/task'

declare module '@/stores/task' {
  export interface TaskStore {
    tasks: Task[];
    nextId: number;
    completedTasks: Task[];
    pendingTasks: Task[];
    totalTasks: number;
    addTask(title: string): void;
    toggleTask(id: number): void;
    deleteTask(id: number): void;
    updateTask(id: number, title: string): void;
  }
}

export {} 