import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useTaskStore } from '../task'

describe('Task Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    // Clear localStorage before each test
    localStorage.clear()
  })

  it('should add a new task', () => {
    const store = useTaskStore()
    const task = store.addTask('Test task')
    expect(store.tasks).toHaveLength(1)
    expect(task.title).toBe('Test task')
    expect(task.completed).toBe(false)
  })

  it('should toggle task completion', () => {
    const store = useTaskStore()
    store.addTask('Test task')
    const task = store.toggleTask(1)
    expect(task?.completed).toBe(true)
    const toggledTask = store.toggleTask(1)
    expect(toggledTask?.completed).toBe(false)
  })

  it('should delete a task', () => {
    const store = useTaskStore()
    store.addTask('Test task')
    expect(store.tasks).toHaveLength(1)
    const success = store.deleteTask(1)
    expect(success).toBe(true)
    expect(store.tasks).toHaveLength(0)
  })

  it('should update a task', () => {
    const store = useTaskStore()
    store.addTask('Test task')
    const updatedTask = store.updateTask(1, 'Updated task')
    expect(updatedTask?.title).toBe('Updated task')
    expect(store.tasks[0].title).toBe('Updated task')
  })

  it('should filter completed and pending tasks', () => {
    const store = useTaskStore()
    store.addTask('Task 1')
    store.addTask('Task 2')
    store.toggleTask(1)
    expect(store.completedTasks).toHaveLength(1)
    expect(store.pendingTasks).toHaveLength(1)
    expect(store.totalTasks).toBe(2)
  })

  it('should validate task title', () => {
    const store = useTaskStore()
    store.addTask('Task 1')
    
    // Test empty title
    const emptyResult = store.taskManager.validateTask('', store.tasks)
    expect(emptyResult.isValid).toBe(false)
    expect(emptyResult.error).toBe('Task title is required')

    // Test duplicate title
    const duplicateResult = store.taskManager.validateTask('Task 1', store.tasks)
    expect(duplicateResult.isValid).toBe(false)
    expect(duplicateResult.error).toBe('A task with this title already exists')

    // Test valid title
    const validResult = store.taskManager.validateTask('Task 2', store.tasks)
    expect(validResult.isValid).toBe(true)
    expect(validResult.error).toBeUndefined()
  })
}) 