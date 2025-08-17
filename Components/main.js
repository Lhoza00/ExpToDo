document.addEventListener('DOMContentLoaded', () => {
    const XP_PER_TASK = 15;
    const XP_THRESHOLD = 100;

    const levelElement = document.getElementById("levelPoint");
    const xpElement = document.getElementById("xpPoint");

    const toDoForm = document.getElementById('toDoForm');
    const toDoInput = toDoForm?.querySelector('input');
    const toDoListUL = document.querySelector('.toDoList');

    let allTodos = getTodos();
    resetCompletedTasksIfNewDay();
    handleCompletedTasksXP();
    updateLevelUI();
    updateTodoList();

    // ==== TO-DO FORM SUBMIT ====
    toDoForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        addTodo();
    });

    function addTodo() {
        const toDoText = toDoInput.value.trim();
        if (toDoText.length > 0) {
            const todoObject = {
                text: toDoText,
                completed: false,
                xpGiven: false
            };
            allTodos.push(todoObject);
            saveTodos();
            updateTodoList();
            toDoInput.value = '';
        }
    }

    function updateTodoList() {
        toDoListUL.innerHTML = '';
        allTodos.forEach((todo, index) => {
            const todoItem = createTodoItem(todo, index);
            toDoListUL.appendChild(todoItem);
        });

        observeToDoItems(); // 👈 Add scroll observer after rendering list
    }

    function createTodoItem(todo, index) {
        const todoLI = document.createElement('li');
        todoLI.className = 'todo';
        const todoId = 'todo-' + index;

        todoLI.innerHTML = `
            <i class="fas fa-trash-alt deleteButton" style="cursor:pointer;"></i>
            <p class="taskToDo" for="${todoId}">${todo.text}</p>
            <button type="button" class="toggleCompleteBtn" for="${todoId}"></button>
        `;

        const taskText = todoLI.querySelector('.taskToDo');
        const buttonCheck = todoLI.querySelector('.toggleCompleteBtn');

        updateButtonUI(todo, taskText, buttonCheck);

        buttonCheck.addEventListener('click', () => {
            todo.completed = !todo.completed;

            if (todo.completed && !todo.xpGiven) {
                giveXP(XP_PER_TASK);
                todo.xpGiven = true;
            }

            saveTodos();
            updateTodoList();
        });

        const deleteButton = todoLI.querySelector('.deleteButton');
        deleteButton.addEventListener('click', () => {
            deleteTodoItem(index);
        });

        return todoLI;
    }

    function updateButtonUI(todo, taskText, button) {
        const todoLI = taskText.closest('li');

        if (todo.completed) {
            taskText.style.textDecoration = 'line-through';
            button.textContent = 'Incomplete';
            todoLI.classList.add('completed-todo');
        } else {
            taskText.style.textDecoration = 'none';
            button.textContent = 'Complete';
            todoLI.classList.remove('completed-todo');
        }
    }

    function deleteTodoItem(index) {
        allTodos = allTodos.filter((_, i) => i !== index);
        saveTodos();
        updateTodoList();
    }

    function saveTodos() {
        localStorage.setItem('todos', JSON.stringify(allTodos));
    }

    function getTodos() {
        const todos = localStorage.getItem('todos');
        return todos ? JSON.parse(todos) : [];
    }

    // ==== XP / LEVEL LOGIC ====
    function giveXP(amount) {
        let level = parseInt(localStorage.getItem("level")) || 0;
        let xp = parseInt(localStorage.getItem("xp")) || 0;

        xp += amount;
        while (xp >= XP_THRESHOLD) {
            xp -= XP_THRESHOLD;
            level += 1;
        }

        localStorage.setItem("level", level);
        localStorage.setItem("xp", xp);
        updateLevelUI();
    }

    function updateLevelUI() {
        const level = localStorage.getItem("level") || 0;
        const xp = localStorage.getItem("xp") || 0;

        if (levelElement) levelElement.textContent = level;
        if (xpElement) xpElement.textContent = xp;
    }

    function handleCompletedTasksXP() {
        let updated = false;
        allTodos = allTodos.map(todo => {
            if (todo.completed && !todo.xpGiven) {
                giveXP(XP_PER_TASK);
                todo.xpGiven = true;
                updated = true;
            }
            return todo;
        });

        if (updated) {
            saveTodos();
        }
    }

    // ==== DAILY RESET ====
    function resetCompletedTasksIfNewDay() {
        const lastDate = localStorage.getItem("lastResetDate");
        const today = new Date().toISOString().split('T')[0];

        if (lastDate !== today) {
            allTodos = allTodos.map(todo => ({
                text: todo.text,
                completed: false,
                xpGiven: todo.xpGiven || false
            }));

            localStorage.setItem('todos', JSON.stringify(allTodos));
            localStorage.setItem("lastResetDate", today);
        }
    }

    // ==== SCROLL FADE-IN EFFECT ====
    function observeToDoItems() {
        const items = document.querySelectorAll('.toDoList li');

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        items.forEach(item => {
            item.classList.remove('fade-in'); // Reset for re-rendering
            observer.observe(item);
        });
    }
});
