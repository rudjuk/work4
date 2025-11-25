import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { Task } from '../../models';
import { TaskInterface } from './task.types';

describe('TaskController', () => {
  let controller: TaskController;
  let mockService: TaskService;

  beforeEach(() => {
    mockService = {
      getTasks: vi.fn(),
      getTask: vi.fn(),
      createTask: vi.fn(),
      updateTask: vi.fn(),
      patchTask: vi.fn(),
      deleteTask: vi.fn(),
    } as unknown as TaskService;

    controller = new TaskController(mockService);
  });

  describe('getAllTasks', () => {
    it('should call service getTasks', async () => {
      const mockTasks: TaskInterface[] = [
        {
          id: '1',
          title: 'Test Task',
          status: 'todo',
          priority: 'normal',
          deadline: null,
        },
      ];

      vi.mocked(mockService.getTasks).mockResolvedValueOnce(mockTasks);

      const result = await controller.getAllTasks();

      expect(result).toEqual(mockTasks);
      expect(mockService.getTasks).toHaveBeenCalledOnce();
    });
  });

  describe('createTask', () => {
    it('should call service createTask', async () => {
      const task = new Task('New Task');
      const mockCreatedTask: TaskInterface = {
        id: '2',
        title: 'New Task',
        status: 'todo',
        priority: 'normal',
        deadline: null,
      };

      vi.mocked(mockService.createTask).mockResolvedValueOnce(mockCreatedTask);

      const result = await controller.createTask(task);

      expect(result).toEqual(mockCreatedTask);
      expect(mockService.createTask).toHaveBeenCalledWith(task);
    });
  });

  describe('deleteTask', () => {
    it('should call service deleteTask', async () => {
      vi.mocked(mockService.deleteTask).mockResolvedValueOnce();

      await controller.deleteTask('1');

      expect(mockService.deleteTask).toHaveBeenCalledWith('1');
    });
  });
});

