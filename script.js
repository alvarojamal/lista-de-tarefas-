document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    // Carregar tarefas salvas ao carregar a página
    loadTasks();

    // Adicionar uma nova tarefa
    addTaskBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTask(taskText);
            taskInput.value = '';
            saveTasks(); // Salvar tarefas no LocalStorage
        }
    });

    // Função para adicionar uma tarefa à lista
    function addTask(taskText, isHighlighted = false) {
        const taskItem = document.createElement('li');
        taskItem.className = 'task';
        if (isHighlighted) {
            taskItem.classList.add('highlight');
        }

        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;

        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'button-container';

        const checkBtn = document.createElement('button');
        checkBtn.textContent = '✔';
        checkBtn.className = 'check-btn';

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'X';
        deleteBtn.className = 'delete-btn';

        // Destacar tarefa como concluída ao clicar no botão "Check"
        checkBtn.addEventListener('click', () => {
            taskItem.classList.toggle('highlight');
            saveTasks(); // Atualizar tarefas no LocalStorage
        });

        // Remover tarefa ao clicar no botão de exclusão
        deleteBtn.addEventListener('click', () => {
            taskList.removeChild(taskItem);
            saveTasks(); // Atualizar tarefas no LocalStorage
        });

        // Adicionar os botões no container
        buttonContainer.appendChild(deleteBtn);
        buttonContainer.appendChild(checkBtn);

        // Adicionar o texto e o container de botões na tarefa
        taskItem.appendChild(taskSpan);
        taskItem.appendChild(buttonContainer);
        taskList.appendChild(taskItem);
    }

    // Função para salvar as tarefas no LocalStorage
    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('.task').forEach((taskItem) => {
            const taskText = taskItem.querySelector('span').textContent;
            const isHighlighted = taskItem.classList.contains('highlight');
            tasks.push({ text: taskText, highlight: isHighlighted });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Função para carregar as tarefas do LocalStorage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach((task) => {
            addTask(task.text, task.highlight);
        });
    }
});
