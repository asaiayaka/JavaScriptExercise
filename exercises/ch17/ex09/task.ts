// ユーザー型
export type User = {
    id: number;
    name: string;
};

// タスク型
export type Task = {
    title: string;
    completed: boolean;
    user: User;
};

// 優先度
export type Priority = "low" | "middle" | "high";

// 優先度付きタスク
export type PriorityTask = Task & {
    priority: Priority;
};

// 型ガード
// Userオブジェクトであることを判定する
// 引数のみunknownを使用
function isUserObject(obj: unknown): obj is User {
    return (
        typeof obj === "object" &&
        obj !== null &&
        typeof (obj as { id?: unknown }).id === "number" &&
        typeof (obj as { name?: unknown }).name === "string"
    );
}

// TaskManager
export class TaskManager<T extends Task> {
    private _tasks: T[] = [];

    // タスクを追加する
    add(task: T): void {
        this._tasks.push(task);
    }

    // タスクを完了する
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

    // タスク取得
    getTasks(predicate?: (task: T) => boolean): T[] {
        if (predicate === undefined) {
            return this._tasks;
        } else {
            return this._tasks.filter(predicate);
        }
    }
}

// 判定関数
// priority="low"または完了済み
export function isLowOrCompletedTask(
    priorityTask: PriorityTask
): boolean {
    return priorityTask.priority === "low" || priorityTask.completed;
}

// 判定関数の否定
export function not<T>(f: (arg: T) => boolean): (arg: T) => boolean {
    return (arg) => !f(arg);
}