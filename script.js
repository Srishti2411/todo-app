window.onload = function() {
    loadTasks();
};

function addTask() {
    var input = document.getElementById("taskInput");
    var task = input.value;

    if (task === "") {
        alert("Enter a task");
        return;
    }

    saveTask(task);
    showTask(task);

    input.value = "";
}

function showTask(task) {
    var li = document.createElement("li");

    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    var span = document.createElement("span");
    span.innerText = task;

    checkbox.onchange = function() {
        span.style.textDecoration = checkbox.checked ? "line-through" : "none";
    };

    // ✏ Edit
    var editBtn = document.createElement("button");
    editBtn.innerText = "✏";

    editBtn.onclick = function() {
        var newTask = prompt("Edit your task:", span.innerText);

        if (newTask && newTask.trim() !== "") {
            updateTask(span.innerText, newTask);
            span.innerText = newTask;
        }
    };

    // ❌ Delete
    var delBtn = document.createElement("button");
    delBtn.innerText = "✖";

    delBtn.onclick = function() {
        li.remove();
        deleteTask(span.innerText);
    };

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(delBtn);

    // 🔥 Animation (fade + slide)
    li.style.opacity = "0";
    li.style.transform = "translateY(-20px)";

    document.getElementById("taskList").appendChild(li);

    setTimeout(function() {
        li.style.opacity = "1";
        li.style.transform = "translateY(0)";
    }, 50);
}

/* STORAGE FUNCTIONS */

function saveTask(task) {
    var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    for (var i = 0; i < tasks.length; i++) {
        showTask(tasks[i]);
    }
}

function deleteTask(task) {
    var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    var newTasks = [];

    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i] !== task) {
            newTasks.push(tasks[i]);
        }
    }

    localStorage.setItem("tasks", JSON.stringify(newTasks));
}

function updateTask(oldTask, newTask) {
    var tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i] === oldTask) {
            tasks[i] = newTask;
        }
    }

    localStorage.setItem("tasks", JSON.stringify(tasks));
}