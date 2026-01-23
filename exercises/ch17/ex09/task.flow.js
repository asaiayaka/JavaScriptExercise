// 型定義
export type User = {
    id: number,
    name: string,
};

export type Task = {
    title: string,
    completed: Boolean,
    user: User,
};

export type Priority = "low" | "middle" | "high";

export type PriorityTask = {
    ...Task,
    priority: Priority,
};

// 型ガード
// Userオブジェクトであることを判定する
function isUserObject(obj: mixed): boolean %checks {
    return (
        typeof obj === "object" &&
        obj !== null &&
        typeof obj.id === "number" &&
        typeof obj.name === "string"
    );
}

// TaskManager
export class TaskManager<T: Task> {
    _tasks: Array<T> = [];

    // タスクを追加する
    add(task: T):void {
        this._tasks.push(task);
    }

    // タスクを完了にする
    completeTask(target: User | string): void {
        if (isUserObject(target)) {
            this._tasks
                .filter((t) => t.user === target)
                .forEach((t) => (t.completed = true));
        } else {
            this._tasks
                .filter((t) => t.title === target)
                .forEach((t) => (t.completed = true));
        }
    }

    // タスクを取得する
    getTasks(predicate?: (task: T) => boolean): Array<T> {
        if (predicate === undefined) {
            return this._tasks;
        } else {
            return this._tasks.filter(predicate);
        }
    }
}

// 判定関数
//  priority="low"または完了済み
export function isLowCompletedTask(
    priorityTask: PriorityTask
): boolean {
    return priorityTask.priority === "low" || priorityTask.completed;
}

// 判定関数の否定
export function not<T>(
    f: (arg: T) => boolean
): (arg: T) => boolean {
    return (arg) => !f(arg);
}