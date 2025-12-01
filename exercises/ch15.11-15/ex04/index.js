// 追加：localStorageが使えるかどうかを判定する関数
function canUseLocalStorage() {
  try {
    const testKey = "__test_ls___";
    window.localStorage.setItem(testKey, "1");
    window.localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
}

const LS_AVAILABLE = canUseLocalStorage();
const STORAGE_KEY = "todos";

// 追加：メモリ上で保持するためのfallback
let memoryTodos = [];

// 追加：localStorageまたはメモリから読み込む
function loadTodos() {
  if (globalThis.LS_AVAILABLE) {
    try {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return Array.isArray(data) ? data : [];
    } catch (e) {
      return [];
    }
  } else {
    // localStorage非対応時はメモリの内容を使う
    return globalThis.memoryTodos;
  }
}

// 追加：localStorageまたはメモリに保存する
function saveTodos(todos) {
  if (globalThis.LS_AVAILABLE) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch (e) {
      // localStorageが途中で壊れても落ちない
    }
  } else {
    globalThis.memoryTodos = todos;
  }
}

// 追加：ToDoをすべて描画し直す
function renderTodos() {
  if (!global.list) {
    return;
  }
  global.list.innerHTML = ""; // いったん全部消す
  const todos = loadTodos();

  todos.forEach((todo) => {
    const elem = createTodoElement(todo);
    global.list.appendChild(elem);
  });
}

// 追加：ToDoの<li>要素を作る関数
function createTodoElement(todo) {
  const elem = document.createElement("li");

  const label = document.createElement("label");
  label.textContent = todo.title;
  label.style.textDecorationLine = todo.done ? "line-through" : "none";

  const toggle = document.createElement("input");
  toggle.type = "checkbox";
  toggle.checked = todo.done;

  // TODO: toggle が変化 (change) した際に label.style.textDecorationLine を変更しなさい
  toggle.addEventListener("change", (e) => {
    label.style.textDecorationLine = e.target.checked ? "line-through" : "none";

    // 追加：データも更新
    const todos = loadTodos();
    const t = todos.find((x) => x.id === todo.id);
    if (t) {
      t.done = e.target.checked;
    }
    saveTodos(todos);
  });

  const destroy = document.createElement("button");
  destroy.textContent = "×";
  destroy.style.border = "none";
  destroy.style.background = "transparent";
  destroy.style.cursor = "pointer";
  destroy.style.marginLeft = "8px"; // ラベルとの間隔を調整

  // TODO: destroy がクリック (click) された場合に elem を削除しなさい
  destroy.addEventListener("click", () => {
    elem.remove();

    // 追加：データからも削除
    let todos = loadTodos();
    todos = todos.filter((x) => x.id !== todo.id);
    saveTodos(todos);
  });

  // TODO: elem 内に toggle, label, destroy を追加しなさい
  const div = document.createElement("div");
  div.append(toggle, label, destroy);
  elem.appendChild(div);

  return elem;
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#new-todo-form");
  global.list = document.querySelector("#todo-list");
  const input = document.querySelector("#new-todo");

  // 初回ロード時に描画
  if (global.list) {
    renderTodos();
  }

  // フォームのsubmitイベント設定
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (input.value.trim() === "") {
      return;
    }
    const title = input.value.trim();
    input.value = "";

    const todo = { id: Date.now(), title, done: false };
    const todos = loadTodos();
    todos.push(todo);
    saveTodos(todos);

    // 画面に追加
    if (global.list) {
      const elem = createTodoElement(todo);
      global.list.appendChild(elem);
    }
  });
});

// const form = document.querySelector("#new-todo-form");
// const list = document.querySelector("#todo-list");
// const input = document.querySelector("#new-todo");

// form.addEventListener("submit", (e) => {
//   // TODO: form のイベントのキャンセルを実施しなさい (なぜでしょう？)
//   e.preventDefault();
//   // → ページがリロードすると ToDo が消えてしまうのを防ぐため

//   // 両端からホワイトスペースを取り除いた文字列を取得する
//   if (input.value.trim() === "") {
//     return;
//   }
//   const title = input.value.trim();

//   // new-todo の中身は空にする
//   input.value = "";

//   // 新しい ToDo データ
//   const todo = {
//     id: Date.now(),   // 一意の ID
//     title,
//     done: false
//   };

//   // データを保存
//   const todos = loadTodos();
//   todos.push(todo);
//   saveTodos(todos);

//   // 画面に反映
//   const elem = createTodoElement(todo);
//   list.appendChild(elem);
// });

// // ==== 追加: 複数タブの同期（localStorage 変更イベント）
// window.addEventListener("storage", (e) => {
//   if (!LS_AVAILABLE) return; // localStorage が使えない場合は無視
//   if (e.key === STORAGE_KEY) {
//     renderTodos(); // 他タブの変更を反映
//   }
// });

// // 初回ロード時に描画
// renderTodos();

// テスト用
globalThis.LS_AVAILABLE = LS_AVAILABLE;
globalThis.memoryTodos = memoryTodos;

export {
  renderTodos,
  createTodoElement,
  loadTodos,
  saveTodos,
  LS_AVAILABLE,
  memoryTodos,
};
