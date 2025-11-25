import { describe, it, expect } from 'vitest';
import { Task } from './task.model';
import { TaskInterface } from '../modules/tasks/task.types';

describe('Task Model', () => {
  it('should create a task with required fields', () => {
    const task = new Task('Test Task', 'Test Description', 'todo', 'normal', null);
    
    expect(task.title).toBe('Test Task');
    expect(task.description).toBe('Test Description');
    expect(task.status).toBe('todo');
    expect(task.priority).toBe('normal');
    expect(task.deadline).toBeNull();
    expect(task.typeTask).toBe('Task');
    expect(task.createdAt).toBeDefined();
  });

  it('should create a task with default values', () => {
    const task = new Task('Test Task');
    
    expect(task.status).toBe('todo');
    expect(task.priority).toBe('normal');
    expect(task.deadline).toBeNull();
    expect(task.typeTask).toBe('Task');
  });

  it('should return correct task info', () => {
    const task = new Task('Test Task', 'Description', 'in-progress', 'high', '2025-12-31');
    const taskInfo = task.getTaskInfo();
    
    expect(taskInfo.title).toBe('Test Task');
    expect(taskInfo.description).toBe('Description');
    expect(taskInfo.status).toBe('in-progress');
    expect(taskInfo.priority).toBe('high');
    expect(taskInfo.deadline).toBe('2025-12-31');
    expect(taskInfo.typeTask).toBe('Task');
    expect(taskInfo.createdAt).toBeDefined();
  });

  it('should update task info', () => {
    const task = new Task('Original Title');
    task.setTaskInfo({ title: 'Updated Title', status: 'done' });
    
    expect(task.title).toBe('Updated Title');
    expect(task.status).toBe('done');
  });

  it('should not update task with empty title', () => {
    const task = new Task('Original Title');
    task.setTaskInfo({ title: '' });
    
    expect(task.title).toBe('Original Title');
  });
});

