import { todos, renderTodos, initApp } from "./index.js";

describe("ToDoアプリの基本動作", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <form id="new-todo-form">
        <input type="text" id="new-todo" />
        <button>Add</button>
      </form>
      <ul id="todo-list"></ul>
      <template id="todo-template">
        <li>
          <div class="view">
            <input class="toggle" type="checkbox" />
            <label class="content"></label>
            <button class="destroy">❌</button>
          </div>
        </li>
      </template>
    `;
    todos.length = 0;
    initApp(); // DOM に依存する処理を初期化
  });

  test("新しいToDoを追加できる", () => {
    todos.push({ content: "テスト1", completed: false });
    renderTodos();
    const items = document.querySelectorAll("li");
    expect(items.length).toBe(1);
    expect(items[0].querySelector("label").textContent).toBe("テスト1");
  });

  test("完了したToDoはcompletedクラスが付く", () => {
    todos.push({ content: "テスト2", completed: true });
    renderTodos();
    const li = document.querySelector("li");
    expect(li.classList.contains("completed")).toBe(true);
  });
});
