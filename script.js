const API_URL = 'https://693311fae5a9e342d271d293.mockapi.io/api/v1/tasks'; // cambia por tu URL real

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const descInput = document.getElementById("descInput"); 
const taskList = document.getElementById("taskList");

// Obtener tareas al cargar
async function fetchTasks() {
  const res = await fetch(API_URL);
  const tasks = await res.json();
  renderTasks(tasks);
}

function renderTasks(tasks) {
  taskList.innerHTML = "";
  tasks.forEach(task => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div>
        <span class="${task.completed ? "completed" : ""}" data-id="${task.id}">
          <strong>${task.title}</strong>
        </span>
        <p style="margin: 5px 0; color: #555;">${task.description || ""}</p>
      </div>
      <div>
        <button onclick="toggleTask('${task.id}', ${task.completed})">✔️</button>
        <button onclick="deleteTask('${task.id}')">❌</button>
      </div>
    `;
    taskList.appendChild(li);
  });
}

// Crear tarea con título y descripción
async function addTask() {
  const title = taskInput.value.trim();
  const description = descInput.value.trim(); // capturar descripción
  if (!title) return;

  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, description, completed: false })
  });

  const newTask = await res.json();
  fetchTasks();
  taskInput.value = "";
  descInput.value = ""; // limpiar campo
}

// Marcar tarea
async function toggleTask(id, completed) {
  await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed: !completed })
  });
  fetchTasks();
}

// Eliminar tarea
async function deleteTask(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  fetchTasks();
}

// Eventos
addTaskBtn.addEventListener("click", addTask);

// Inicializar
fetchTasks();
