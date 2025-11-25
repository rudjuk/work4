import { describe, it, expect } from 'vitest';
import { Bug } from './bug.model';

describe('Bug Model', () => {
  it('should create a bug with bug-specific fields', () => {
    const bug = new Bug(
      'Bug Title',
      'Bug Description',
      'todo',
      'high',
      null,
      'Step 1, Step 2',
      'Expected result',
      'Actual result',
      'critical'
    );
    
    expect(bug.title).toBe('Bug Title');
    expect(bug.stepsToReproduce).toBe('Step 1, Step 2');
    expect(bug.expectedResult).toBe('Expected result');
    expect(bug.actualResult).toBe('Actual result');
    expect(bug.severity).toBe('critical');
    expect(bug.typeTask).toBe('Bug');
  });
});

