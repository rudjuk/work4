import { Status, Priority } from '../modules/tasks/task.types';

export function getStatusLabel(status: Status): string {
  const statusMap: Record<Status, string> = {
    'todo': 'To Do',
    'in-progress': 'In Progress',
    'done': 'Виконано',
  };
  return statusMap[status] || status;
}

export function getPriorityLabel(priority: Priority): string {
  const priorityMap: Record<Priority, string> = {
    'low': 'Низький',
    'normal': 'Нормальний',
    'high': 'Високий',
  };
  return priorityMap[priority] || priority;
}

export function getPriorityClass(priority: Priority): string {
  return `priority-${priority}`;
}

export function getStatusClass(status: Status): string {
  return `status-${status}`;
}

export function formatDate(dateString: string | null): string {
  if (!dateString) return 'Не вказано';
  const date = new Date(dateString);
  return date.toLocaleDateString('uk-UA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

