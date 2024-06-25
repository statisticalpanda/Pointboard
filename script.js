let tasks = [];
let users = {};
let isAdmin = false;
let username = '';

function setUser() {
    username = document.getElementById('username').value;
    if (!username) {
        alert('Please enter a name');
        return;
    }

    if (username.toLowerCase() === 'admin') {
        isAdmin = true;
        document.getElementById('admin-section').style.display = 'block';
    } else {
        document.getElementById('user-points-section').style.display = 'block';
    }
    document.getElementById('user-section').style.display = 'none';
}

function addTask() {
    const task = document.getElementById('task').value;
    if (!task) {
        alert('Please enter a task');
        return;
    }

    tasks.push({ task: task, points: {} });
    document.getElementById('task').value = '';
    renderTasks();
}

function renderTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const taskItem = document.createElement('div');
        taskItem.className = 'task-item';
        taskItem.textContent = `${index + 1}. ${task.task}`;
        taskList.appendChild(taskItem);
    });

    if (tasks.length > 0) {
        document.getElementById('reveal-btn').style.display = 'block';
    }

    renderUserPoints();
}

function renderUserPoints() {
    const tasksContainer = document.getElementById('tasks-container');
    tasksContainer.innerHTML = '';
    tasks.forEach((task, index) => {
        const taskItem = document.createElement('div');
        taskItem.className = 'task-item';
        taskItem.textContent = `${index + 1}. ${task.task}`;

        const pointsInput = document.createElement('input');
        pointsInput.className = 'points-input';
        pointsInput.type = 'number';
        pointsInput.id = `points-${index}`;
        pointsInput.placeholder = 'Enter points';

        taskItem.appendChild(pointsInput);
        tasksContainer.appendChild(taskItem);
    });
}

function revealPoints() {
    tasks.forEach((task, index) => {
        const points = document.getElementById(`points-${index}`).value;
        task.points[username] = points;
    });

    const resultContainer = document.createElement('div');
    resultContainer.innerHTML = '<h3>Results</h3>';
    tasks.forEach((task, index) => {
        const resultItem = document.createElement('div');
        resultItem.textContent = `${index + 1}. ${task.task} - Points: ${JSON.stringify(task.points)}`;
        resultContainer.appendChild(resultItem);
    });

    document.body.appendChild(resultContainer);
    document.getElementById('reveal-btn').disabled = true;
}
