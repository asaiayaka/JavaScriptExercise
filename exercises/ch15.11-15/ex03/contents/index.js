const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

document.addEventListener("DOMContentLoaded", async () => {
  // TODO: ここで API を呼び出してタスク一覧を取得し、
  // 成功したら取得したタスクを appendToDoItem で ToDo リストの要素として追加しなさい

  // --- CORS + Cookie をつけて API を呼び出すための例 ---
  // mode: "cors" → CORS を使うことを明示
  // credentials: "include" → クロスオリジンでも Cookie を送る
  const res = await fetch("http://localhost:3001/api/tasks", {
    method: "GET",
    mode: "cors",          // ★ CORS リクエストを行う
    credentials: "include" // ★ Cookie を含める
  });
  const data = await res.json();

  // 取得した items をすべてリストに追加
  data.items.forEach((task) => appendToDoItem(task));
});

form.addEventListener("submit", async (e) => {
  // TODO: ここで form のイベントのキャンセルを実施しなさい (なぜでしょう？)

  // --- 送信するとブラウザがページ遷移してしまうため、JS で処理したいのでキャンセルする ---
  e.preventDefault();

  const todo = input.value.trim();
  if (todo === "") {
    return;
  }

  input.value = "";

  // TODO: ここで API を呼び出して新しいタスクを作成し
  // 成功したら作成したタスクを appendToDoItem で ToDo リストの要素として追加しなさい

  const res = await fetch("http://localhost:3001/api/tasks", {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: todo })
  });
  const newTask = await res.json();
  appendToDoItem(newTask);
});

// API から取得したタスクオブジェクトを受け取って、ToDo リストの要素を追加する
function appendToDoItem(task) {
  const elem = document.createElement("li");

  const label = document.createElement("label");
  label.textContent = task.name;
  label.style.textDecorationLine = task.status === "completed" ? "line-through" : "none";

  const toggle = document.createElement("input");
  toggle.type = "checkbox";
  toggle.checked = task.status === "completed";

  // TODO: toggle が変化 (change) した際に API を呼び出してタスクの状態を更新し
  // 成功したら label.style.textDecorationLine を変更しなさい

  toggle.addEventListener("change", async () => {
    const newStatus = toggle.checked ? "completed" : "active";

    await fetch(`http://localhost:3001/api/tasks/${task.id}`, {
      method: "PATCH",
      mode: "cors",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus })
    });

    label.style.textDecorationLine = newStatus === "completed" ? "line-through" : "none";
  });

  const destroy = document.createElement("button");
  destroy.textContent = "Delete";

  // TODO: destroy がクリック (click) された場合に API を呼び出してタスク を削除し
  // 成功したら elem を削除しなさい

  destroy.addEventListener("click", async () => {
    await fetch(`http://localhost:3001/api/tasks/${task.id}`, {
      method: "DELETE",
      mode: "cors",
      credentials: "include"
    });

    elem.remove();
  });

  // TODO: elem 内に toggle, label, destroy を追加しなさい
  elem.appendChild(toggle);
  elem.appendChild(label);
  elem.appendChild(destroy);

  list.prepend(elem);
}
