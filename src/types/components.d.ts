import { DefineComponent } from 'vue'
import type { Task } from '@/stores/task'

declare module 'vue' {
  export interface GlobalComponents {
    TaskCard: DefineComponent<{
      task: {
        type: () => Task;
        required: true;
      };
    }>;
    TaskForm: DefineComponent<{
      initialTitle?: string;
      taskId?: number;
    }>;
  }
}

export {} 