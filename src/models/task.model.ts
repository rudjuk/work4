import { TaskInterface, Status, Priority, TypeTask } from '../modules/tasks/task.types';

export class Task implements TaskInterface {
  public id?: string; // id генерується на сервері, тому опціональний
  public createdAt?: string;
  public typeTask: TypeTask = 'Task';

  constructor(
    public title: string,
    public description?: string,
    public status: Status = 'todo',
    public priority: Priority = 'normal',
    public deadline: string | null = null
  ) {
    this.createdAt = new Date().toISOString();
    this.typeTask = 'Task';
  }

  setTaskInfo(data: Partial<TaskInterface>): void {
    if (data.title === '') {
      console.log('title пусте! Елемент не прийнято.');
      return;
    }

    if (data.description === '') {
      console.log('Рекомендується заповнювати description!');
    }

    // Оновлюємо тільки ті поля, які передані і не порожні
    if (data.title !== undefined && data.title !== '') {
      this.title = data.title;
    }
    if (data.description !== undefined) {
      this.description = data.description;
    }
    if (data.status !== undefined) {
      this.status = data.status;
    }
    if (data.priority !== undefined) {
      this.priority = data.priority;
    }
    if (data.deadline !== undefined) {
      this.deadline = data.deadline;
    }
    if (data.id !== undefined) {
      this.id = data.id;
    }
  }

  getTaskInfo(): TaskInterface {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      createdAt: this.createdAt,
      status: this.status,
      priority: this.priority,
      deadline: this.deadline,
      typeTask: this.typeTask,
    };
  }
}
