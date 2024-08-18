import { inject, Injectable, signal } from "@angular/core";
import { Task, TaskStatus } from "./task.model";
import { LoggingService } from "../logging.service";

export default class TasksService {
    private logginService = inject(LoggingService);
    private tasks = signal<Task[]>([]);
    allTasks() {
        return this.tasks()
    }
    addTask(taskData: { title: string, description: string }) {
        const newTask: Task = {
            ...taskData,
            status: 'OPEN',
            id: this.tasks().length.toString()

        }
        this.tasks.update((curr) => [...this.tasks(), newTask])
        this.logginService.log("ADDED TASK with title " + taskData.title)
    }
    updateTaskStatus(taskId: string, newStatus: TaskStatus) {
        this.tasks.update((curr) =>
            curr.map(task =>
                task.id === taskId ? ({ ...task, status: newStatus }) : task))
        this.logginService.log("CHANGE TASK status to  " + newStatus)

    }

}