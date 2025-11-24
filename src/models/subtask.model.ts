import { Task } from './task.model';
import { TaskInterface } from '../modules/tasks/task.types';

export class Subtask extends Task {
    // Унікальне поле для підзавдання - ID батьківського завдання
    public parentTaskId?: number | string;

    constructor(
        id: number | string,
        title: string,
        description?: string,
        createdAt?: string | Date,
        status: 'todo' | 'in_progress' | 'done' = 'todo',
        priority: 'low' | 'medium' | 'high' = 'medium',
        deadline?: string | Date,
        parentTaskId?: number | string
    ) {
        super(id, title, description, createdAt, status, priority, deadline, 'Subtask');
        this.parentTaskId = parentTaskId;
    }

    getTaskInfo(): TaskInterface {
        const baseInfo = super.getTaskInfo();
        return {
            ...baseInfo,
            // Додаємо унікальне поле до інформації про завдання
            parentTaskId: this.parentTaskId
        } as TaskInterface & { parentTaskId?: number | string };
    }
}

