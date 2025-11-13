const template = document.createElement("template");
template.innerHTML = `\
<style>
  :host {
    font-family: sans-serif;
    display: block;
    max-width: 400px;
    margin: 20px auto;
  }
  form {
    display: flex;
    gap: 8px;
    margin-bottom: 10px;
  }
  input[type="text"] {
    flex: 1;
    padding: 5px;
  }
  button {
    padding: 5px 10px;
  }
  ul {
    list-style: none;
    padding-left: 0;
  }
  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 4px 0;
    border-bottom: 1px solid #eee;
  }
  li span.completed {
    text-decoration: line-through;
    color: #888;
  }
</style>

<form id="new-todo-form">
  <input type="text" id="new-todo" placeholder="What needs to be done?" />
  <button>Add</button>
</form>

<div id="info">
  <span id="count"></span>
</div>

<ul id="todo-list"></ul>
`;

class TodoApp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.form = this.shadowRoot.querySelector("#new-todo-form");
    this.input = this.shadowRoot.querySelector("#new-todo");
    this.list = this.shadowRoot.querySelector("#todo-list");
    this.count = this.shadowRoot.querySelector("#count");

    // 保存済み ToDo をロード
    const saved = localStorage.getItem("todos");
    this._todos = saved ? JSON.parse(saved) : [];
  }

  connectedCallback() {
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      const text = this.input.value.trim();
      if (!text) return;
      this._todos.push({ text, completed: false });
      this.input.value = "";
      this._save();
      this._render();
    });
    this._render();
  }

  _toggle(index) {
    this._todos[index].completed = !this._todos[index].completed;
    this._save();
    this._render();
  }

  _delete(index) {
    this._todos.splice(index, 1);
    this._save();
    this._render();
  }

  _save() {
    localStorage.setItem("todos", JSON.stringify(this._todos));
  }

  _render() {
    this.list.innerHTML = "";
    this._todos.forEach((todo, i) => {
      const li = document.createElement("li");
      li.innerHTML = `
          <span class="${todo.completed ? "completed" : ""}">
            ${todo.text}
          </span>
          <div>
            <button data-action="toggle">${
              todo.completed ? "Undo" : "Done"
            }</button>
            <button data-action="delete">Delete</button>
          </div>
        `;
      li.querySelector('[data-action="toggle"]').onclick = () =>
        this._toggle(i);
      li.querySelector('[data-action="delete"]').onclick = () =>
        this._delete(i);
      this.list.appendChild(li);
    });

    const total = this._todos.length;
    const completed = this._todos.filter((t) => t.completed).length;
    this.count.textContent = `Total: ${total}, Completed: ${completed}`;
  }
}

customElements.define("todo-app", TodoApp);
