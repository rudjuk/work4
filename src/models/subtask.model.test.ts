import { describe, it, expect } from 'vitest';
import { Subtask } from './subtask.model';

describe('Subtask Model', () => {
  it('should create a subtask with parent task id', () => {
    const subtask = new Subtask('Subtask Title', 'Description', 'todo', 'normal', null, 'parent-123');
    
    expect(subtask.title).toBe('Subtask Title');
    expect(subtask.parentTaskId).toBe('parent-123');
    expect(subtask.typeTask).toBe('Subtask');
  });

  it('should include parentTaskId in task info', () => {
    const subtask = new Subtask('Subtask', undefined, 'todo', 'normal', null, 'parent-456');
    const taskInfo = subtask.getTaskInfo();
    
    expect((taskInfo as any).parentTaskId).toBe('parent-456');
  });
});

