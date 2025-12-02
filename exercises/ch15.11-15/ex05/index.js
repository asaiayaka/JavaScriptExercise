const DB_NAME = "todo-app";
const STORE_NAME = "todos";
let db;

// 複数タブ同期
const channel = new BroadcastChannel("todo-sync");

// IndexedDBの初期化
function initDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onupgradeneeded = (event) => {
      db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    };

    request.onsuccess = (event) => {
      db = event.target.result;
      resolve();
    };

    request.onerror = (event) => reject(event.target.error);
  });
}

// すべてのToDoを取得
function getTodos() {
  return new Promise((resolve) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const request = store.getAll();

    request.onsuccess = () => resolve(request.result || []);
    request.onerror = () => resolve([]);
  });
}

// ToDoを追加または更新
function saveTodo(todo) {
  return new Promise((resolve) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    store.put(todo);

    tx.oncomplete = () => {
      channel.postMessage("update"); // 他タブに通知
      resolve();
    };
  });
}

// ToDo 削除
function deleteTodo(id) {
  return new Promise((resolve) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    store.delete(id);

    tx.oncomplete = () => {
      channel.postMessage("update"); // 他タブに通知
      resolve();
    };
  });
}

// DOM操作用
const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

// ToDoの<li>要素を作る関数
function createTodoElement(todo) {
  const elem = document.createElement("li");

  const label = document.createElement("label");
  label.textContent = todo.title;
  label.style.textDecorationLine = todo.done ? "line-through" : "none";
  const toggle = document.createElement("input");
  // TODO: toggleが変化(change)した際にlabel.style.textDecorationLineを変更しなさい
  toggle.type = "checkbox";
  toggle.checked = todo.done;
  toggle.addEventListener("change", async (e) => {
    todo.done = e.target.checked;
    label.style.textDecorationLine = todo.done ? "line-through" : "none";
    await saveTodo(todo);
  });

  const destroy = document.createElement("button");
  destroy.textContent = "×";
  destroy.style.border = "none";
  destroy.style.background = "transparent";
  destroy.style.cursor = "pointer";
  destroy.style.marginLeft = "8px"; // ラベルとの間隔を調整

  //   TODO: destroyがクリック(click)された場合にelemを削除しなさい
  destroy.addEventListener("click", async () => {
    elem.remove();
    await deleteTodo(todo.id);
  });

  // TODO: elem内にtoggle, label, destroy を追加しなさい
  elem.append(toggle, label, destroy);
  return elem;
}

// ToDoリストを描画する関数
async function renderTodos() {
  list.innerHTML = "";
  const todos = await getTodos();
  todos.forEach((todo) => {
    const elem = createTodoElement(todo);
    list.appendChild(elem);
  });
}

// submitイベント登録
form.addEventListener("submit", async (e) => {
  // TODO: ここでformのイベントのキャンセルを実施しなさい(なぜでしょう？)
  e.preventDefault();
  // 両端からホワイトスペースを取り除いた文字列を取得する
  if (!input.value.trim()) {
    return;
  }
  const todo = {
    id: Date.now(),
    title: input.value.trim(),
    done: false,
  };
  input.value = "";
  await saveTodo(todo);
  const elem = createTodoElement(todo);
  list.appendChild(elem);
});

// 複数タブの同期
channel.onmessage = async () => {
  await renderTodos();
};

// 初期化
(async function () {
  await initDB();
  await renderTodos();
})();

export {
  initDB,
  getTodos,
  saveTodo,
  deleteTodo,
  createTodoElement,
  renderTodos,
};