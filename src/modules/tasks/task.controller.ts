// TaskController — клас, який приймає вхідні дані і викликає відповідні методи сервісу
import { TaskService, TaskList } from './task.service';
import { TaskInterface } from './task.types';
import { Task, Subtask, Bug, Story, Epic } from '../../models';

export class TaskController {
  private service: TaskService;

  constructor(service: TaskService) {
    this.service = service;
  }

  // Отримання всіх завдань
  async getAllTasks(): Promise<TaskList> {
    return this.service.getTasks();
  }

  // Отримання завдання за ID
  async getTask(id: string): Promise<TaskInterface | null> {
    return this.service.getTask(id);
  }

  // Створення нового завдання будь-якого типу
  async createTask(task: Task | Subtask | Bug | Story | Epic): Promise<TaskInterface> {
    return this.service.createTask(task);
  }

  // Оновлення завдання
  async updateTask(task: TaskInterface): Promise<TaskInterface> {
    return this.service.updateTask(task);
  }

  // Часткове оновлення завдання
  async patchTask(id: string, updates: Partial<TaskInterface>): Promise<TaskInterface> {
    return this.service.patchTask(id, updates);
  }

  // Видалення завдання
  async deleteTask(id: string): Promise<void> {
    return this.service.deleteTask(id);
  }
}
