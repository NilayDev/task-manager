declare module 'vue' {
  export interface GlobalComponents {
    TaskCard: typeof import('../components/TaskCard.vue')['default']
    TaskForm: typeof import('../components/TaskForm.vue')['default']
  }
}

export {} 