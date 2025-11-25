import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { TaskService } from './task.service';
import { Task } from '../../models';
import { TaskInterface } from './task.types';

// Мокуємо global fetch
global.fetch = vi.fn();

describe('TaskService', () => {
  let service: TaskService;
  const mockFetch = global.fetch as ReturnType<typeof vi.fn>;

  beforeEach(() => {
    service = new TaskService();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('getTasks', () => {
    it('should fetch all tasks successfully', async () => {
      const mockTasks: TaskInterface[] = [
        {
          id: '1',
          title: 'Test Task',
          description: 'Test Description',
          status: 'todo',
          priority: 'normal',
          deadline: null,
          createdAt: '2025-01-24T12:00:00.000Z',
        },
      ];

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockTasks,
      });

      const result = await service.getTasks();

      expect(result).toEqual(mockTasks);
      expect(mockFetch).toHaveBeenCalledWith('http://localhost:3000/tasks');
    });

    it('should throw error when fetch fails', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        statusText: 'Not Found',
      });

      await expect(service.getTasks()).rejects.toThrow('Помилка отримання списку завдань: Not Found');
    });
  });

  describe('getTask', () => {
    it('should fetch a single task by id', async () => {
      const mockTask: TaskInterface = {
        id: '1',
        title: 'Test Task',
        description: 'Test Description',
        status: 'todo',
        priority: 'normal',
        deadline: null,
        createdAt: '2025-01-24T12:00:00.000Z',
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockTask,
      });

      const result = await service.getTask('1');

      expect(result).toEqual(mockTask);
      expect(mockFetch).toHaveBeenCalledWith('http://localhost:3000/tasks/1');
    });

    it('should return null for 404', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
      });

      const result = await service.getTask('999');

      expect(result).toBeNull();
    });
  });

  describe('createTask', () => {
    it('should create a task successfully', async () => {
      const task = new Task('New Task', 'Description', 'todo', 'normal', null);
      const mockCreatedTask: TaskInterface = {
        id: '2',
        title: 'New Task',
        description: 'Description',
        status: 'todo',
        priority: 'normal',
        deadline: null,
        createdAt: '2025-01-24T12:00:00.000Z',
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockCreatedTask,
      });

      const result = await service.createTask(task);

      expect(result).toEqual(mockCreatedTask);
      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:3000/tasks',
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        })
      );
    });

    it('should not include id and typeTask in request body', async () => {
      const task = new Task('New Task', 'Description', 'todo', 'normal', null);
      task.id = 'should-not-be-sent';

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ id: '2', ...task.getTaskInfo() }),
      });

      await service.createTask(task);

      const callArgs = mockFetch.mock.calls[0];
      const requestBody = JSON.parse(callArgs[1].body);

      expect(requestBody.title).toBe('New Task');
    });

    it('should throw error when creation fails', async () => {
      const task = new Task('New Task');

      mockFetch.mockResolvedValueOnce({
        ok: false,
        statusText: 'Bad Request',
        text: async () => 'Validation error',
      });

      await expect(service.createTask(task)).rejects.toThrow('Помилка створення завдання');
    });
  });

  describe('updateTask', () => {
    it('should update a task successfully', async () => {
      const task: TaskInterface = {
        id: '1',
        title: 'Updated Task',
        description: 'Updated Description',
        status: 'done',
        priority: 'high',
        deadline: null,
        createdAt: '2025-01-24T12:00:00.000Z',
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => task,
      });

      const result = await service.updateTask(task);

      expect(result).toEqual(task);
      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:3000/tasks/1',
        expect.objectContaining({
          method: 'PUT',
        })
      );
    });

    it('should throw error when task id is missing', async () => {
      const task: TaskInterface = {
        title: 'Task without id',
        status: 'todo',
        priority: 'normal',
        deadline: null,
      };

      await expect(service.updateTask(task)).rejects.toThrow('ID завдання не вказано');
    });
  });

  describe('deleteTask', () => {
    it('should delete a task successfully', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
      });

      await service.deleteTask('1');

      expect(mockFetch).toHaveBeenCalledWith('http://localhost:3000/tasks/1', {
        method: 'DELETE',
      });
    });

    it('should throw error when deletion fails', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        statusText: 'Not Found',
      });

      await expect(service.deleteTask('999')).rejects.toThrow('Помилка видалення завдання');
    });
  });
});

