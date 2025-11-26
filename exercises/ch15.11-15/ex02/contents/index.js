import { retryWithExponentialBackoff } from "./retry.js";

const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

// 通信中はUIをすべて無効化する
function disableUI(disabled) {
  const controls = document.querySelectorAll("input, button");
  controls.forEach((c) => (c.disabled = disabled));
}

// 3秒タイムアウト + 500番台リトライ付きfetch関数
async function fetchWithRetry(url, options = {}, maxRetry = 3) {
  return new Promise((resolve, reject) => {
    let controller;
    let timer;

    const tryFetch = async () => {
      controller = new AbortController();
      options.signal = controller.signal;

      // 3秒でタイムアウト → abort()
      timer = setTimeout(() => controller.abort(), 3000);

      try {
        const res = await fetch(url, options);
        clearTimeout(timer);

        if (res.status >= 500 && res.status < 600) {
          return false;
        }
        return res;
      } catch (err) {
        clearTimeout(timer);
        if (err.message === "AbortError") {
          throw new Error("timeout");
        } else {
          throw err;
        }
      }
    };

    // retryWithExponentialBackoffを使って再試行
    retryWithExponentialBackoff(
      () => tryFetch(),
      maxRetry,
      (result) => {
        if (result === false) {
          reject(new Error("retry failed"));
        } else {
          resolve(result);
        }
      }
    );
  });
}

// ページ読み込み時：タスク一覧を取得して表示
document.addEventListener("DOMContentLoaded", async () => {
  // TODO: ここで API を呼び出してタスク一覧を取得し、
  // 成功したら取得したタスクを appendToDoItem で ToDo リストの要素として追加しなさい
  disableUI(true);

  try {
    // APIから一覧を取得
    const res = await fetchWithRetry("/api/tasks");
    const json = await res.json();

    // appendToDoItemでDOMへ追加
    json.items.forEach((task) => appendToDoItem(task));
  } catch (err) {
    if (err.message === "timeout") {
      alert("リクエストがタイムアウトしました");
    } else {
      alert("一覧の取得に失敗しました");
    }
  } finally {
    disableUI(false);
  }
});

// 新規タスク追加フォーム
form.addEventListener("submit", async (e) => {
  // TODO: ここで form のイベントのキャンセルを実施しなさい (なぜでしょう？)
  // formのデフォルト動作（ページリロード）を防ぐため

  // 両端からホワイトスペースを取り除いた文字列を取得する
  e.preventDefault();

  const todo = input.value.trim();
  if (todo === "") {
    return;
  }

  // new-todo の中身は空にする
  input.value = "";

  disableUI(true);

  // TODO: ここで API を呼び出して新しいタスクを作成し
  // 成功したら作成したタスクを appendToDoItem で ToDo リストの要素として追加しなさい
  try {
    const res = await fetchWithRetry("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: todo }),
    });

    const task = await res.json();
    appendToDoItem(task);
  } catch (err) {
    if (err.message === "timeout") {
      alert("リクエストがタイムアウトしました");
    } else {
      alert("タスクの作成に失敗しました");
    }
  }
  disableUI(false);
});

// API から取得したタスクオブジェクトを受け取って、ToDo リストの要素を追加する
function appendToDoItem(task) {
  // ここから #todo-list に追加する要素を構築する
  const elem = document.createElement("li");

  const label = document.createElement("label");
  label.textContent = task.name;
  label.style.textDecorationLine = task.status === "completed" ? "line-through" : "none";

  const toggle = document.createElement("input");
  // TODO: toggle が変化 (change) した際に API を呼び出してタスクの状態を更新し
  // 成功したら label.style.textDecorationLine を変更しなさい
  toggle.type = "checkbox";
  toggle.checked = task.status === "completed";

  // チェックボックス更新（状態を変更）
  toggle.addEventListener("change", async () => {
    disableUI(true);

    try {
      const res = await fetchWithRetry(`/api/tasks/${task.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: toggle.checked ? "completed" : "active",
        }),
      });

      const updated = await res.json();

      // DOの反映
      label.style.textDecorationLine = updated.status === "completed" ? "line-through" : "none";
    } catch (err) {
      // 失敗時は元に戻す
      toggle.checked = !toggle.checked;

      if (err.message === "timeout") {
        alert("リクエストがタイムアウトしました");
      } else {
        alert("状態更新に失敗しました");
      }
    } finally {
      disableUI(false);
    }
  });

  const destroy = document.createElement("button");
  // TODO: destroy がクリック (click) された場合に API を呼び出してタスク を削除し
  // 成功したら elem を削除しなさい
  destroy.textContent = "削除";

  // 削除
  destroy.addEventListener("click", async () => {
    disableUI(true);

    try {
      await fetchWithRetry(`/api/tasks/${task.id}`, {
        method: "DELETE",
      });

      elem.remove();
    } catch (err) {
      if (err.message === "timeout") {
        alert("リクエストがタイムアウトしました");
      } else {
        alert("削除に失敗しました");
      }
    }

    disableUI(false);
  })
  
  // TODO: elem 内に toggle, label, destroy を追加しなさい
  elem.append(toggle, label, destroy);
  list.prepend(elem);
}
