const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

// ---------------------------------------
// ページ読み込み時：サーバからタスク一覧を取得して表示する
// ---------------------------------------
document.addEventListener("DOMContentLoaded", async () => {
  // TODO: ここで API を呼び出してタスク一覧を取得し、
  // 成功したら取得したタスクを appendToDoItem で ToDo リストの要素として追加しなさい
  
  // document.cookie の確認
  console.log("document.cookie:", document.cookie);

  try {
    const res = await fetch("http://localhost:3001/api/tasks", {
      // cookieを送るため
      credentials: "include",
    });

    // fetch のステータスを確認
    console.log("fetch /api/tasks status:", res.status);

    // エラーが返ってきたとき
    if (!res.ok) {
      const err = await res.json();
      console.log("fetch error message:", err.message);
      alert(err.message);
      return;
    }

    // 成功：itemsにタスク一覧が入っている
    const data = await res.json();
    // 取得したタスク一覧を確認
    console.log("fetch /api/tasks data:", data.items);
    data.items.forEach(task => appendToDoItem(task)); 
  } catch (e) {
    // 例外発生時の情報を確認
    console.error("fetch /api/tasks exception:", e); 
    alert(e);
  }
});

// ---------------------------------------
// 新規タスク追加：フォーム送信イベント
// ---------------------------------------
form.addEventListener("submit", async (e) => {
  // TODO: ここで form のイベントのキャンセルを実施しなさい (なぜでしょう？)
  // submit は本来ページをリロードしてしまうため、キャンセル必須
  e.preventDefault();

  // 両端からホワイトスペースを取り除いた文字列を取得する
  const todo = input.value.trim();
  if (todo === "") {
    return;
  }

  // new-todo の中身は空にする
  input.value = "";

  // TODO: ここで API を呼び出して新しいタスクを作成し
  // 成功したら作成したタスクを appendToDoItem で ToDo リストの要素として追加しなさい
  try {
    const res = await fetch("http://localhost:3001/api/tasks", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: todo }),
    });

    // POST のステータスを確認
    console.log("fetch POST /api/tasks status:", res.status); 

    // エラー時
    if (!res.ok) {
      const err = await res.json();
      // POST エラーメッセージ確認
      console.log("fetch POST error message:", err.message); 
      alert(err.message);
      return;
    }

    // 作成されたTaskオブジェクトを受け取る
    const task = await res.json();
    // 作成されたタスクオブジェクトを確認
    console.log("fetch POST created task:", task); 
    appendToDoItem(task);
  } catch (e) {
    console.error("fetch POST exception:", e);
    alert(e);
  }
});

// API から取得したタスクオブジェクトを受け取って、ToDo リストの要素を追加する
function appendToDoItem(task) {
  // ここから #todo-list に追加する要素を構築する
  const elem = document.createElement("li");

  // タスク名
  const label = document.createElement("label");
  label.textContent = task.name;
  // 完了状態なら取り消し線を引く
  label.style.textDecorationLine = task.status === "completed" ? "line-through" :"none";

  // 完了・未完了を切り替えるチェックボックス
  const toggle = document.createElement("input");
  // TODO: toggle が変化 (change) した際に API を呼び出してタスクの状態を更新し
  // 成功したら label.style.textDecorationLine を変更しなさい
  toggle.type = "checkbox";
  toggle.checked = task.status === "completed";

  // 状態変更時にPATCH /api/tasks/{id}を呼ぶ
  toggle.addEventListener("change", async () => {
    try {
      const res = await fetch(`http://localhost:3001/api/tasks/${task.id}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: toggle.checked ? "completed" : "active",
        }),
      });

      // PATCH ステータス確認
      console.log(`PATCH /api/tasks/${task.id} status:`, res.status); 

      // エラー時
      if (!res.ok) {
        const err = await res.json();
        alert(err.message);
        // UIを元に戻す
        toggle.checked = !toggle.checked;
        return;
      }

      const updated = await res.json();
      // 更新後のタスクを確認
      console.log(`PATCH updated task:`, updated); 
      // 成功時：取り消し線を更新
      label.style.textDecorationLine = updated.status === "completed" ? "line-through" : "none";
     } catch (e) {
      console.error(`PATCH exception:`, e);
      alert(e);
     }
  });

  // 削除ボタン
  const destroy = document.createElement("button");
  // TODO: destroy がクリック (click) された場合に API を呼び出してタスク を削除し
  // 成功したら elem を削除しなさい
  destroy.textContent = "×";
  // クリック時にDELETE /api/tasks/{id}を呼ぶ
  destroy.addEventListener("click", async () => {
    try {
      const res = await fetch(`http://localhost:3001/api/tasks/${task.id}`, {
        method: "DELETE",
        credentials: "include",
      });

      // DELETE ステータス確認
      console.log(`DELETE /api/tasks/${task.id} status:`, res.status); 

      if (!res.ok) {
        const err = await res.json();
        alert(err.message);
        return;
      }

      // 成功→画面から要素を削除
      elem.remove();
    } catch (e) {
      console.error(`DELETE exception:`, e);
      alert(e);
    }
  });

  // TODO: elem 内に toggle, label, destroy を追加しなさい
  elem.append(toggle, label, destroy);
  list.prepend(elem);
}
