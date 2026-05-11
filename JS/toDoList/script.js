const todos = [];

function renderTodoList() {
  let htmlRows = "";

  for (let i = 0; i < todos.length; i++) {
    const todoObject = todos[i];
    const { task, date } = todoObject;
    // const todo= todoObject.task;
    // const date= todoObject.date;

    //   const html = `<p>
    //   ${task} ${date}

    //   </p>`;
    //   htmlList += html;

    const row = `
    <tr>
    <td>${task}<td>
    <td>${date}<td>
    <td>
  <button onclick="todos.splice(${i}, 1);
  renderTodoList();
  ">Delete</button>
    <td>
    <tr>`;

    htmlRows += row;
  }

  const tableHTML = `
  <table>
  <thead>
  <tr>
    <th>משימה</th>
    <th>תאריך</th>
    <th>פעולות</th>
    <tr>
  </thead>
  <tbody>${htmlRows}</tbody>
</table>`;

  document.querySelector(".js-todo-list").innerHTML = tableHTML;
}

function addtodo() {
  const inputElement = document.querySelector(".js-input-name");
  const task = inputElement.value;

  const inputDateElement = document.querySelector(".js-input-date");
  const date = inputDateElement.value;

  todos.push({ task, date });

  inputElement.value = "";
  inputDateElement.value = "";

  renderTodoList();
}
