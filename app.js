let pendingTasks = [];
let completedTasks = [];

function addTask() {
  const taskTitleInput = document.getElementById('taskTitle');
  const taskDescriptionInput = document.getElementById('taskDescription');

  const taskTitle = taskTitleInput.value.trim();
  const taskDescription = taskDescriptionInput.value.trim();

  if (taskTitle !== '') {
    const task = {
      title: taskTitle,
      description: taskDescription,
      added: new Date().toLocaleString(),
      completed: false,
      completedTime: null,
    };

    pendingTasks.push(task);
    taskTitleInput.value = '';
    taskDescriptionInput.value = '';
    renderTasks();
  }
}

function markComplete(index) {
  const completedTask = pendingTasks.splice(index, 1)[0];
  completedTask.completed = true;
  completedTask.completedTime = new Date().toLocaleString();
  completedTasks.push(completedTask);
  renderTasks();
}

function deleteTask(list, index) {
  list.splice(index, 1);
  renderTasks();
}

function renderTasks() {
  const pendingList = document.getElementById('pendingTasks');
  const completedList = document.getElementById('completedTasks');

  pendingList.innerHTML = '';
  completedList.innerHTML = '';

  pendingTasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div>
        <h3>${task.title}</h3>
        <p>${task.description}</p>
        <span>Added: ${task.added}</span>
      </div>
      <div class="task-actions">
        <button onclick="markComplete(${index})">Complete</button>
        <button onclick="deleteTask(pendingTasks, ${index})">Delete</button>
      </div>
    `;
    pendingList.appendChild(li);
  });

  completedTasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div>
        <h3>${task.title}</h3>
        <p>${task.description}</p>
        <span>Added: ${task.added}</span>
        <span>Completed at: ${task.completedTime}</span>
      </div>
      <div class="task-actions">
        <button onclick="deleteTask(completedTasks, ${index})">Delete</button>
      </div>
    `;
    li.classList.add('completed-task');
    completedList.appendChild(li);
  });
}

renderTasks();
