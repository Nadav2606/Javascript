const users = [
  { id: 1, name: "Alice Johnson", email: "alice.johnson@example.com", age: 24 },
  { id: 2, name: "Bob Smith", email: "bob.smith@example.com", age: 28 },
  { id: 3, name: "Charlie Brown", email: "charlie.brown@example.com", age: 22 },
  { id: 4, name: "Diana Prince", email: "diana.prince@example.com", age: 30 },
  { id: 12, name: "Laura Thomas", email: "laura.thomas@example.com", age: 25 },
  {
    id: 13,
    name: "Michael Jackson",
    email: "michael.jackson@example.com",
    age: 40,
  },
  { id: 14, name: "Nina Harris", email: "nina.harris@example.com", age: 21 },
  { id: 15, name: "Oscar Martin", email: "oscar.martin@example.com", age: 33 },
  { id: 16, name: "Paula Garcia", email: "paula.garcia@example.com", age: 28 },
  { id: 17, name: "Quentin Lee", email: "quentin.lee@example.com", age: 36 },
  {
    id: 18,
    name: "Rachel Walker",
    email: "rachel.walker@example.com",
    age: 27,
  },
  { id: 19, name: "Sam Hall", email: "sam.hall@example.com", age: 32 },
  { id: 20, name: "Tina Allen", email: "tina.allen@example.com", age: 26 },
  { id: 5, name: "Ethan Clark", email: "ethan.clark@example.com", age: 27 },
  { id: 6, name: "Fiona Davis", email: "fiona.davis@example.com", age: 26 },
  { id: 7, name: "George Miller", email: "george.miller@example.com", age: 35 },
  { id: 8, name: "Hannah Wilson", email: "hannah.wilson@example.com", age: 23 },
  { id: 9, name: "Ian Moore", email: "ian.moore@example.com", age: 31 },
  { id: 10, name: "Julia Taylor", email: "julia.taylor@example.com", age: 29 },
  {
    id: 11,
    name: "Kevin Anderson",
    email: "kevin.anderson@example.com",
    age: 34,
  },
];

let nextId = 21;
let editingId = null;

let search = "";

let form = document.getElementById("user-form");
let nameInput = document.getElementById("name");
let emailInput = document.getElementById("email");
let ageInput = document.getElementById("age");
let tableBody = document.getElementById("table-body");
let userCount = document.getElementById("user-count");
let submitBtn = document.getElementById("submit-btn");
let cancelBtn = document.getElementById("cancel-title");
let formTitle = document.getElementById("form-title");
let searchInput = document.getElementById("search-input");

function rendeTable() {
  tableBody.innerHTML = "";
  let filterdUsers = users.filter((user) => {
    return user.name.toLocaleLowerCase().includes(search.toLocaleLowerCase());
  });
  userCount.textContent = filterdUsers.length;

  for (let i = 0; i < users.length; i++) {
    let user = filterdUsers[i];

    let row = document.createElement("tr");
    if (user.id === editingId) {
      row.className = "editing";
    }

    row.innerHTML = `
    <td>${i + 1}</td>
    <td>${user.name}</td>
    <td>${user.email}</td>
    <td>${user.age}</td>
    <td>
<button onclick="startEdit(${user.id})"  >Edit</button>
<button onclick="deleteUser(${user.id})">Delete</button>
    </td>`;

    tableBody.appendChild(row);
  }
  deleteUser();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let name = nameInput.value;
  let email = emailInput.value;
  let age = Number(ageInput.value);

  if (editingId === null) {
    let newUser = {
      id: nextId,
      name: name,
      email: email,
      age: age,
    };
    users.push(newUser);
    nextId++;
  } else {
    for (let i = 0; i < users.length; i++) {
      if (users[i].id === editingId) {
        users[i].name = name;
        users[i].email = email;
        users[i].age = age;
        break;
      }
    }
  }
  resetForm();
  rendeTable();
});

function startEdit(id) {
  let user = null;
  for (let i = 0; i < users.length; i++) {
    if (users[i].id === id) {
      user = users[i];
      break;
    }
  }

  nameInput.value = user.name;
  emailInput.value = user.email;
  ageInput.value = user.age;

  editingId = id;
  formTitle.textContent = "Edit User";
  submitBtn.textContent = "Save Changes";

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  rendeTable();
}

function deleteUser(id) {
  if (!confirm("Are you sure you want to delete this User?")) return;
  for (let i = 0; i < users.length; i++) {
    if (users[i].id === id) {
      users.splice(i, 1);
      break;
    }
  }
  rendeTable();
  resetForm();
}

cancelBtn.addEventListener("click", () => {
  resetForm();
});

function resetForm() {
  form.reset();
  rendeTable();
  editingId = null;
  formTitle.textContent = "Add New User";
  submitBtn.textContent = "Add user";
}

rendeTable();

searchInput.addEventListener("input", () => {
  search = searchInput.value;

  rendeTable();
});
