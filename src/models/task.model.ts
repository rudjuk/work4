import { TaskInterface, Status, Priority, TypeTask } from '../modules/tasks/task.types';

export class Task implements TaskInterface {
    constructor(
        public id: number | string,
        public title: string,
        public description?: string,
        public createdAt?: string | Date,
        public status: Status = 'todo',
        public priority: Priority = 'medium',
        public deadline?: string | Date,
        public typeTask: TypeTask = 'Task'
    ) {
        this.init();
    }

    // Встановлення налаштувань класу
    protected init(): void {
        // Визначаємо тип завдання на основі назви класу
        const className = this.constructor.name;
        if (className === 'Task' || className === 'Subtask' || className === 'Bug' || className === 'Story' || className === 'Epic') {
            this.typeTask = className as TypeTask;
        }
    }

    setTaskInfo(data: TaskInterface): void {
        // Перевіряємо коректність даних
        if (data.id === '') {
            console.log('id пусте! Елемент не прийнято.');
            return;
        }

        if (data.title === '') {
            console.log('title пусте! Елемент не прийнято.');
            return;
        }

        if (data.description === '') {
            console.log('Рекомендується заповнювати description! ');
        }

        Object.assign(this, data);
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
            typeTask: this.typeTask
        };
    }
}

