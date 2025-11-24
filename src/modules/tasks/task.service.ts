// TaskService — сервіс для роботи з json-server через Fetch API
import { TaskInterface } from './task.types';
import { Task, Subtask, Bug, Story, Epic } from '../../models';

const API_BASE_URL = 'http://localhost:3000';

export type TaskList = TaskInterface[];

export class TaskService {
  // Отримання всіх завдань
  async getTasks(): Promise<TaskList> {
    const response = await fetch(`${API_BASE_URL}/tasks`);

    if (!response.ok) {
      throw new Error(`Помилка отримання списку завдань: ${response.statusText}`);
    }

    return response.json();
  }

  // Отримання завдання за ID
  async getTask(id: string): Promise<TaskInterface | null> {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`);

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`Помилка отримання завдання: ${response.statusText}`);
    }

    return response.json();
  }

  // Створення нового завдання будь-якого типу
  async createTask(task: Task | Subtask | Bug | Story | Epic): Promise<TaskInterface> {
    const taskData = task.getTaskInfo();
    const requestBody = {
      ...taskData,
      createdAt: taskData.createdAt || new Date().toISOString(),
    };

    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`Помилка створення завдання: ${response.statusText}`);
    }

    return response.json();
  }

  // Оновлення завдання
  async updateTask(task: TaskInterface): Promise<TaskInterface> {
    if (!task.id) {
      throw new Error('ID завдання не вказано');
    }

    const response = await fetch(`${API_BASE_URL}/tasks/${task.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });

    if (!response.ok) {
      throw new Error(`Помилка оновлення завдання: ${response.statusText}`);
    }

    return response.json();
  }

  // Часткове оновлення завдання
  async patchTask(id: string, updates: Partial<TaskInterface>): Promise<TaskInterface> {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      throw new Error(`Помилка оновлення завдання: ${response.statusText}`);
    }

    return response.json();
  }

  // Видалення завдання
  async deleteTask(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Помилка видалення завдання: ${response.statusText}`);
    }
  }
}
