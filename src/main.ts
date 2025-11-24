import './style.css';
import { TaskController } from './modules/tasks/task.controller';
import { TaskService } from './modules/tasks/task.service';
import { TaskInterface } from './modules/tasks/task.types';
import { Task } from './models';
import { formatDate, getStatusLabel, getPriorityLabel } from './utils/task.utils';

const tasksListElement = document.querySelector<HTMLDivElement>('#tasks-list')!;
const taskForm = document.querySelector<HTMLFormElement>('#task-form')!;

// Ініціалізуємо сервіс та контролер з dependency injection
const taskService = new TaskService();
const taskController = new TaskController(taskService);

// Функція для створення елемента завдання
function createTaskElement(task: TaskInterface): HTMLDivElement {
  const taskElement = document.createElement('div');
  taskElement.className = 'task-item';
  taskElement.setAttribute('data-id', task.id || '');

  const safeTitle = (task.title || '').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const safeDescription = (task.description || '').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const statusLabel = getStatusLabel(task.status || 'todo');
  const priorityLabel = getPriorityLabel(task.priority || 'normal');
  const createdAtFormatted = formatDate(task.createdAt || null);
  const deadlineFormatted = formatDate(task.deadline || null);

  taskElement.innerHTML = `
    <div class="task-header">
      <h3>${safeTitle}</h3>
      <button class="delete-btn" data-id="${task.id || ''}">Видалити</button>
    </div>
    <p class="task-description">${safeDescription}</p>
    <div class="task-meta">
      <div class="task-info">
        <span class="task-label">Тип:</span>
        <span class="task-value">${(task.typeTask || 'Task').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</span>
      </div>
      <div class="task-info">
        <span class="task-label">Статус:</span>
        <span class="task-value">${statusLabel.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</span>
      </div>
      <div class="task-info">
        <span class="task-label">Пріоритет:</span>
        <span class="task-value">${priorityLabel.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</span>
      </div>
      <div class="task-info">
        <span class="task-label">Створено:</span>
        <span class="task-value">${createdAtFormatted.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</span>
      </div>
      <div class="task-info">
        <span class="task-label">Дедлайн:</span>
        <span class="task-value">${deadlineFormatted.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</span>
      </div>
    </div>
  `;

  // Додаємо обробник для кнопки видалення
  const deleteBtn = taskElement.querySelector<HTMLButtonElement>('.delete-btn')!;
  deleteBtn.addEventListener('click', async () => {
    if (task.id && confirm('Ви впевнені, що хочете видалити це завдання?')) {
      try {
        await taskController.deleteTask(task.id);
        await loadTasks();
      } catch (error) {
        alert(`Помилка видалення: ${error instanceof Error ? error.message : 'Невідома помилка'}`);
      }
    }
  });

  return taskElement;
}

// Функція для завантаження та відображення списку завдань
async function loadTasks(): Promise<void> {
  try {
    tasksListElement.innerHTML = '<p class="loading">Завантаження...</p>';
    const tasks = await taskController.getAllTasks();

    if (tasks.length === 0) {
      tasksListElement.innerHTML = '<p class="empty">Немає завдань. Створіть перше завдання!</p>';
      return;
    }

    tasksListElement.innerHTML = '';
    tasks.forEach((task) => {
      tasksListElement.appendChild(createTaskElement(task));
    });
  } catch (error) {
    tasksListElement.innerHTML = `<p class="error">Помилка завантаження завдань: ${error instanceof Error ? error.message : 'Невідома помилка'}<br><br>Переконайтеся, що json-server запущений на порту 3000.<br>Запустіть: <code>npm run server</code></p>`;
    console.error('Помилка завантаження завдань:', error);
  }
}

// Обробка форми створення завдання
taskForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(taskForm);
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const status = formData.get('status') as TaskInterface['status'];
  const priority = formData.get('priority') as TaskInterface['priority'];
  const deadline = formData.get('deadline') as string;

  try {
    // Створюємо завдання типу Task (можна розширити для інших типів)
    const task = new Task(
      title,
      description,
      status,
      priority,
      deadline || null
    );

    await taskController.createTask(task);

    // Очищаємо форму
    taskForm.reset();

    // Оновлюємо список завдань
    await loadTasks();
  } catch (error) {
    alert(`Помилка створення завдання: ${error instanceof Error ? error.message : 'Невідома помилка'}`);
    console.error('Помилка створення завдання:', error);
  }
});

// Завантажуємо завдання при завантаженні сторінки
loadTasks();
