import { describe, it, expect } from 'vitest';
import { getStatusLabel, getPriorityLabel, getPriorityClass, getStatusClass, formatDate } from './task.utils';

describe('Task Utils', () => {
  describe('getStatusLabel', () => {
    it('should return correct label for todo status', () => {
      expect(getStatusLabel('todo')).toBe('To Do');
    });

    it('should return correct label for in-progress status', () => {
      expect(getStatusLabel('in-progress')).toBe('In Progress');
    });

    it('should return correct label for done status', () => {
      expect(getStatusLabel('done')).toBe('Виконано');
    });
  });

  describe('getPriorityLabel', () => {
    it('should return correct label for low priority', () => {
      expect(getPriorityLabel('low')).toBe('Низький');
    });

    it('should return correct label for normal priority', () => {
      expect(getPriorityLabel('normal')).toBe('Нормальний');
    });

    it('should return correct label for high priority', () => {
      expect(getPriorityLabel('high')).toBe('Високий');
    });
  });

  describe('getPriorityClass', () => {
    it('should return correct CSS class for priority', () => {
      expect(getPriorityClass('low')).toBe('priority-low');
      expect(getPriorityClass('normal')).toBe('priority-normal');
      expect(getPriorityClass('high')).toBe('priority-high');
    });
  });

  describe('getStatusClass', () => {
    it('should return correct CSS class for status', () => {
      expect(getStatusClass('todo')).toBe('status-todo');
      expect(getStatusClass('in-progress')).toBe('status-in-progress');
      expect(getStatusClass('done')).toBe('status-done');
    });
  });

  describe('formatDate', () => {
    it('should format valid date string', () => {
      const date = '2025-01-24T12:00:00.000Z';
      const formatted = formatDate(date);
      expect(formatted).toMatch(/\d{2}\.\d{2}\.\d{4}/);
    });

    it('should return "Не вказано" for null', () => {
      expect(formatDate(null)).toBe('Не вказано');
    });

    it('should return "Не вказано" for invalid date', () => {
      expect(formatDate('invalid-date')).toBe('Не вказано');
    });
  });
});

