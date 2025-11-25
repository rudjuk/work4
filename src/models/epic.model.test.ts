import { describe, it, expect } from 'vitest';
import { Epic } from './epic.model';

describe('Epic Model', () => {
  it('should create an epic with epic-specific fields', () => {
    const epic = new Epic(
      'Epic Title',
      'Epic Description',
      'todo',
      'high',
      null,
      ['story-1', 'story-2'],
      ['Goal 1', 'Goal 2'],
      'High business value'
    );
    
    expect(epic.title).toBe('Epic Title');
    expect(epic.relatedStories).toEqual(['story-1', 'story-2']);
    expect(epic.goals).toEqual(['Goal 1', 'Goal 2']);
    expect(epic.businessValue).toBe('High business value');
    expect(epic.typeTask).toBe('Epic');
  });
});

