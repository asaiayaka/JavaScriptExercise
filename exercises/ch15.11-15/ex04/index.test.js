/**
 * @jest-environment jsdom
 */

import { jest } from "@jest/globals";
import {
  renderTodos,
  createTodoElement,
  loadTodos,
  saveTodos,
  memoryTodos,
  LS_AVAILABLE,
} from "./index.js";

describe("ToDo管理アプリ", () => {
  let input;
  let form;

  // localStorageをモック
  beforeEach(() => {
    document.body.innerHTML = `
        <form id ="new-todo-form">
            <input type="text" id="new-todo" />
            <button type="submit">Add</button>
        </form>
        <ul id="todo-list"></ul>
        `;
    form = document.querySelector("#new-todo-form");
    input = document.querySelector("#new-todo");
    global.list = document.querySelector("#todo-list");

    // localStorageを初期化
    localStorage.clear();

    // submitイベント登録
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (input.value.trim() === "") {
        return;
      }

      const todo = { id: Date.now(), title: input.value.trim(), done: false };
      const todos = loadTodos();
      todos.push(todo);
      saveTodos(todos);

      const elem = createTodoElement(todo);
      global.list.appendChild(elem);

      input.value = "";
    });
  });

  test("追加ボタンでToDoが追加されるか", () => {
    // 入力値設定
    input.value = "テスト ToDo";

    // submitイベント発火
    form.dispatchEvent(new Event("submit"));

    // li要素が追加されることを確認
    expect(global.list.children.length).toBe(1);
    const li = global.list.children[0];
    expect(li.textContent).toContain("テスト ToDo");

    // localStorageにも追加されていること
    const todos = JSON.parse(localStorage.getItem("todos"));
    expect(todos[0].title).toBe("テスト ToDo");
  });

  // チェックボックス更新で取り消し線が切り替わるか
  test("チェックボックスで完了状態が切り替わる", () => {
    // ToDoを作成
    const todo = { id: 1, title: "完了テスト", done: false };
    localStorage.setItem("todos", JSON.stringify([todo]));

    // renderTodosを呼ぶ
    renderTodos();

    const li = global.list.children[0];
    expect(li).not.toBeNull();

    const checkbox = li.querySelector("input[type='checkbox']");
    const label = li.querySelector("label");

    expect(label.style.textDecorationLine).toBe("none");

    // チェックを入れる
    checkbox.checked = true;
    checkbox.dispatchEvent(new Event("change"));

    expect(label.style.textDecorationLine).toBe("line-through");

    // localStorageの状態も更新されること
    const after = JSON.parse(localStorage.getItem("todos"));
    expect(after[0].done).toBe(true);
  });

  // 削除ボタンでToDoが消えるか
  test("削除ボタンでToDoを削除できる", () => {
    const todo = { id: 2, title: "削除テスト", done: false };
    localStorage.setItem("todos", JSON.stringify([todo]));
    renderTodos();

    const li = global.list.children[0];
    expect(li).not.toBeNull();

    const button = li.querySelector("button");
    button.click();

    // liが削除される
    expect(global.list.children.length).toBe(0);

    // localStorageからも削除される
    const after = JSON.parse(localStorage.getItem("todos"));
    expect(after.length).toBe(0);
  });

  // localStorage無効時のフォールバック
  test("localStorageが使えない場合はメモリ上で動作する", () => {
    // LS_AVAILABLEをfalseに強制
    global.LS_AVAILABLE = false;

    // memoryTodosを初期化
    global.memoryTodos = [];

    input.value = "メモリのみ ToDo";
    form.dispatchEvent(new Event("submit"));

    expect(global.list.children.length).toBe(1);
    expect(global.memoryTodos.length).toBe(1);
    expect(global.memoryTodos[0].title).toBe("メモリのみ ToDo");

    // localStorageは空
    expect(localStorage.getItem("todos")).toBeNull();
  });
});
