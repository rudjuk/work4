import { Task } from './task.model';
import { TaskInterface } from '../modules/tasks/task.types';

export class Story extends Task {
    // Унікальні поля для історії - оцінка складності та приймальні критерії
    public storyPoints?: number;
    public acceptanceCriteria?: string[];
    public assignee?: string;

    constructor(
        id: number | string,
        title: string,
        description?: string,
        createdAt?: string | Date,
        status: 'todo' | 'in_progress' | 'done' = 'todo',
        priority: 'low' | 'medium' | 'high' = 'medium',
        deadline?: string | Date,
        storyPoints?: number,
        acceptanceCriteria?: string[],
        assignee?: string
    ) {
        super(id, title, description, createdAt, status, priority, deadline, 'Story');
        this.storyPoints = storyPoints;
        this.acceptanceCriteria = acceptanceCriteria;
        this.assignee = assignee;
    }

    getTaskInfo(): TaskInterface {
        const baseInfo = super.getTaskInfo();
        return {
            ...baseInfo,
            // Додаємо унікальні поля до інформації про завдання
            storyPoints: this.storyPoints,
            acceptanceCriteria: this.acceptanceCriteria,
            assignee: this.assignee
        } as TaskInterface & {
            storyPoints?: number;
            acceptanceCriteria?: string[];
            assignee?: string;
        };
    }
}

