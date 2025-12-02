
import "fake-indexeddb/auto";

import {
  renderTodos,
  createTodoElement,
  loadTodos,
  saveTodos,
  SS_AVAILABLE,
} from "./index.js";

// DOM の準備（document.body を用意）
beforeAll(() => {
  document.body.innerHTML = `
    <form id="new-todo-form">
      <input type="text" id="new-todo">
    </form>
    <ul id="todo-list"></ul>
  `;
});

// sessionStorage のモック
const sessionStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => (key in store ? store[key] : null),
    setItem: (key, value) => {
      store[key] = String(value);
    },
    removeItem: (key) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

// Storage として認識させるため prototype を設定
Object.setPrototypeOf(sessionStorageMock, Storage.prototype);

// グローバルに差し込む（beforeEach のたびにクリーン）
beforeEach(() => {
  Object.defineProperty(window, "sessionStorage", {
    value: sessionStorageMock,
    configurable: true,
  });
  sessionStorageMock.clear();

  // index.js は DOMContentLoaded 時に list を取る設計だが、
  // テストでは明示的にグローバル参照をセットして描画する
  const list = document.querySelector("#todo-list");
  globalThis.list = list;
  renderTodos();
});

// storage イベントのヘルパー（同一タブで手動発火）
function dispatchStorageEvent(key, newValue) {
  const event = new StorageEvent("storage", {
    key,
    newValue,
    url: "http://localhost", // JSDOMの場合は任意でOK
  });
  window.dispatchEvent(event);
}

// テスト開始
describe("sessionStorage版 ToDo アプリのテスト", () => {
  test("初期状態では ToDo が空であるべき", () => {
    expect(loadTodos()).toEqual([]);
  });

  test("ToDo を保存できる", () => {
    const todo = { id: 1, title: "テスト", done: false };
    saveTodos([todo]);
    expect(loadTodos()).toEqual([todo]);
  });

  test("ToDo を更新できる（done: true に変更）", () => {
    const updated = { id: 1, title: "テスト", done: true };
    saveTodos([updated]);
    expect(loadTodos()[0].done).toBe(true);
  });

  test("ToDo を削除できる", () => {
    // 既存のデータを削除する
    saveTodos([]);
    expect(loadTodos().length).toBe(0);
  });

  test("sessionStorage の storage イベントで他タブ同期が動く", () => {
    // まずデータを保存
    const payload = [{ id: 1, title: "同期テスト", done: false }];
    saveTodos(payload);

    // 他タブからの変更を模したイベントを手動発火
    // index.js の STORAGE_KEY は "todos"
    dispatchStorageEvent("todos", JSON.stringify(payload));

    // 即時再描画される前提（必要なら setTimeout を少し入れる）
    const listItems = document.querySelectorAll("#todo-list li");
    expect(listItems.length).toBe(1);
    expect(listItems[0].textContent).toContain("同期テスト");
  });
});
