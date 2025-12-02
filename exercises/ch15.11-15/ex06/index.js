// sessionStorage が使えるかどうかを判定する関数
function canUseSessionStorage() {
  try {
    const testKey = "__test_ss__";
    window.sessionStorage.setItem(testKey, "1");
    window.sessionStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
}

const SS_AVAILABLE = canUseSessionStorage();
const STORAGE_KEY = "todos";

// メモリ上で保持するための fallback
let memoryTodos = [];

// sessionStorage またはメモリから読み込む
function loadTodos() {
  if (globalThis.SS_AVAILABLE) {
    try {
      const data = JSON.parse(sessionStorage.getItem(STORAGE_KEY));
      return Array.isArray(data) ? data : [];
    } catch (e) {
      return [];
    }
  } else {
    // sessionStorage 非対応時はメモリの内容を使う
    return globalThis.memoryTodos;
  }
}

// sessionStorage またはメモリに保存する
function saveTodos(todos) {
  if (globalThis.SS_AVAILABLE) {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch (e) {
      // sessionStorage が途中で壊れても落ちない
    }
  } else {
    globalThis.memoryTodos = todos;
  }
}

// ToDo をすべて描画し直す
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

// ToDo の <li> 要素を作る関数
function createTodoElement(todo) {
  const elem = document.createElement("li");

  const label = document.createElement("label");
  label.textContent = todo.title;
  label.style.textDecorationLine = todo.done ? "line-through" : "none";

  const toggle = document.createElement("input");
  toggle.type = "checkbox";
  toggle.checked = todo.done;

  // TODO: toggle が変化 (change) した際に label.style.textDecorationLine を変更
  toggle.addEventListener("change", (e) => {
    label.style.textDecorationLine = e.target.checked ? "line-through" : "none";

    // データも更新
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

  // TODO: destroy がクリック (click) された場合に elem を削除
  destroy.addEventListener("click", () => {
    elem.remove();

    // データからも削除
    let todos = loadTodos();
    todos = todos.filter((x) => x.id !== todo.id);
    saveTodos(todos);
  });

  // TODO: elem 内に toggle, label, destroy を追加
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

  // フォームの submit イベント設定
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

// 複数タブの同期（sessionStorage 変更イベント）
window.addEventListener("storage", (e) => {
  if (!SS_AVAILABLE) return; // sessionStorage が使えない場合は無視
  if (e.key === STORAGE_KEY) {
    renderTodos(); // 他タブの変更を反映
  }
});

// テスト用
globalThis.SS_AVAILABLE = SS_AVAILABLE;
globalThis.memoryTodos = memoryTodos;

export {
  renderTodos,
  createTodoElement,
  loadTodos,
  saveTodos,
  SS_AVAILABLE,
  memoryTodos,
};
