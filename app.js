// Obtener elementos del DOM
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Cargar tareas al iniciar la página
document.addEventListener('DOMContentLoaded', loadTasks);

// Función para agregar tareas
function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Escribe una tarea.');
        return;
    }

    // Crear un nuevo elemento de lista (li)
    const li = document.createElement('li');
    li.innerHTML = `
        ${taskText}
        <div>
            <button class="complete" onclick="completeTask(this)">Completar</button>
            <button class="delete" onclick="deleteTask(this)">Eliminar</button>
        </div>
    `;
    
    taskList.appendChild(li);
    saveTask(taskText);
    taskInput.value = ''; // Limpiar el input
}

// Función para completar tareas
function completeTask(button) {
    const li = button.parentNode.parentNode;
    li.classList.toggle('completed');
}

// Función para eliminar tareas
function deleteTask(button) {
    const li = button.parentNode.parentNode;
    taskList.removeChild(li);
    removeTask(li.textContent.trim());
}

// Función para guardar tareas en localStorage
function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Función para cargar tareas desde localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${task}
            <div>
                <button class="complete" onclick="completeTask(this)">Completar</button>
                <button class="delete" onclick="deleteTask(this)">Eliminar</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

// Función para eliminar tareas de localStorage
function removeTask(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(t => t !== task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
