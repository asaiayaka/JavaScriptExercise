const template = document.createElement("template");
template.innerHTML = `\
<style>
.completed {
  text-decoration: line-through;
}
</style>

<form id="new-todo-form">
  <input type="text" id="new-todo" placeholder="What needs to be done?" />
  <button>Add</button>
</form>
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

    this._todos = []; // [{ text:'task', completed:false }, ...]
  }

  connectedCallback() {
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      const text = this.input.value.trim();
      if (!text) return;
      this._todos.push({ text, completed: false });
      this.input.value = "";
      this._render();
    });
  }

  _toggle(index) {
    this._todos[index].completed = !this._todos[index].completed;
    this._render();
  }

  _delete(index) {
    this._todos.splice(index, 1);
    this._render();
  }

  _render() {
    this.list.innerHTML = "";
    this._todos.forEach((todo, i) => {
      const li = document.createElement("li");
      li.innerHTML = `
          <span class="${todo.completed ? "completed" : ""}">
            ${todo.text}
          </span>
          <button data-action="toggle">${
            todo.completed ? "Undo" : "Done"
          }</button>
          <button data-action="delete">Delete</button>
        `;
      li.querySelector('[data-action="toggle"]').onclick = () =>
        this._toggle(i);
      li.querySelector('[data-action="delete"]').onclick = () =>
        this._delete(i);
      this.list.appendChild(li);
    });
  }
}

customElements.define("todo-app", TodoApp);
