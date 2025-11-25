import { describe, it, expect } from 'vitest';
import { Story } from './story.model';

describe('Story Model', () => {
  it('should create a story with story-specific fields', () => {
    const story = new Story(
      'Story Title',
      'Story Description',
      'in-progress',
      'normal',
      '2025-12-31',
      5,
      ['Criterion 1', 'Criterion 2'],
      'John Doe'
    );
    
    expect(story.title).toBe('Story Title');
    expect(story.storyPoints).toBe(5);
    expect(story.acceptanceCriteria).toEqual(['Criterion 1', 'Criterion 2']);
    expect(story.assignee).toBe('John Doe');
    expect(story.typeTask).toBe('Story');
  });
});

