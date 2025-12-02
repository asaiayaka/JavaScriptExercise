import "fake-indexeddb/auto"; // IndexedDB モック

// structuredClone polyfill
if (typeof structuredClone === "undefined") {
  global.structuredClone = (obj) => JSON.parse(JSON.stringify(obj));
}

// DOM モック
beforeAll(() => {
  document.body.innerHTML = `
    <form id="new-todo-form">
      <input type="text" id="new-todo">
    </form>
    <ul id="todo-list"></ul>
  `;
});

// BroadcastChannel のモック
global.BroadcastChannel = class {
  constructor(name) {
    this.name = name;
  }
  postMessage() {}
  close() {}
};

// dynamic import でモジュールを読み込む
let initDB, getTodos, saveTodo, deleteTodo;

beforeAll(async () => {
  const module = await import("./index.js");
  initDB = module.initDB;
  getTodos = module.getTodos;
  saveTodo = module.saveTodo;
  deleteTodo = module.deleteTodo;

  await initDB();
});

describe("ToDoアプリ IndexedDBテスト", () => {
  test("初期状態ではToDoが空であるべき", async () => {
    const todos = await getTodos();
    expect(todos).toEqual([]);
  });

  test("ToDoを保存できる", async () => {
    const todo = { id: 1, title: "テストタスク", done: false };

    await saveTodo(todo);
    const todos = await getTodos();

    expect(todos.length).toBe(1);
    expect(todos[0]).toEqual(todo);
  });

  test("ToDoを更新できる（doneをtrueに）", async () => {
    const updated = { id: 1, title: "テストタスク", done: true };

    await saveTodo(updated);
    const todos = await getTodos();

    expect(todos[0].done).toBe(true);
  });

  test("ToDoを削除できる", async () => {
    await deleteTodo(1);
    const todos = await getTodos();

    expect(todos.length).toBe(0);
  });
});
