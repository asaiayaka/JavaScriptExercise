export const todos = [];

let form, list, input, template;

export function initApp() {
  form = document.querySelector("#new-todo-form");
  list = document.querySelector("#todo-list");
  input = document.querySelector("#new-todo");
  template = document.querySelector("#todo-template");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const content = input.value.trim();
    if (!content) return;
    todos.push({ content, completed: false });
    input.value = "";
    renderTodos();
  });

  window.addEventListener("hashchange", renderTodos);

  renderTodos();
}

export function renderTodos() {
  const filter = getCurrentFilter();
  list.innerHTML = "";

  todos.forEach((todo, index) => {
    if (
      (filter === "active" && todo.completed) ||
      (filter === "completed" && !todo.completed)
    ) {
      return;
    }

    const clone = template.content.cloneNode(true);
    const li = clone.querySelector("li");
    const toggle = clone.querySelector("input");
    const label = clone.querySelector("label");
    const destroy = clone.querySelector("button");

    li.classList.toggle("completed", todo.completed);
    toggle.checked = todo.completed;
    label.textContent = todo.content;

    toggle.addEventListener("change", () => {
      todo.completed = toggle.checked;
      renderTodos();
    });

    destroy.addEventListener("click", () => {
      todos.splice(index, 1);
      renderTodos();
    });

    list.appendChild(li);
  });
}

function getCurrentFilter() {
  const hash = window.location.hash;
  if (hash === "#/active") return "active";
  if (hash === "#/completed") return "completed";
  return "all";
}
