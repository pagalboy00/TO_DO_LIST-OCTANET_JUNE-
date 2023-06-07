let tasks = [];

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        const task = {
            id: Date.now(),
            text: taskText,
            priority: "low"
        };

        tasks.push(task);
        taskInput.value = "";

        renderTasks();
    }
}

function removeTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
}

function filterAll() {
    renderTasks();
}

function filterHighPriority() {
    const filteredTasks = tasks.filter(task => task.priority === "high");
    renderTasks(filteredTasks);
}

function filterLowPriority() {
    const filteredTasks = tasks.filter(task => task.priority === "low");
    renderTasks(filteredTasks);
}

function setPriority(id, priority) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            task.priority = priority;
        }
        return task;
    });
    renderTasks();
}

function renderTasks(filteredTasks = tasks) {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    filteredTasks.forEach(task => {
        const li = document.createElement("li");
        li.className = "task";
        if (task.priority === "high") {
            li.classList.add("high-priority");
        } else {
            li.classList.add("low-priority");
        }

        const taskText = document.createTextNode(task.text);
        taskText.className="tasksol"
        li.appendChild(taskText);

        const removeButton = document.createElement("button");
        removeButton.innerHTML = "Remove";
        removeButton.className="btn"
        removeButton.onclick = () => removeTask(task.id);
        // li.appendChild(removeButton);
        let buttonWrapper = document.createElement("div");
        buttonWrapper.className="flexRowCC";
        const priorityButton = document.createElement("button");
        if (task.priority === "high") {
            priorityButton.innerHTML = "Low Priority";
            priorityButton.className="btn"
            priorityButton.onclick = () => setPriority(task.id, "low");
        } else {
            priorityButton.innerHTML = "High Priority";
            priorityButton.className="btn"
            priorityButton.onclick = () => setPriority(task.id, "high");
        }
        buttonWrapper.appendChild(removeButton);
        buttonWrapper.appendChild(priorityButton);

        // li.appendChild(priorityButton);
        li.appendChild(buttonWrapper);

        taskList.appendChild(li);
    });
}
