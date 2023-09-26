// Select elements
const taskInput = document.getElementById('task');
const taskDateInput = document.getElementById('taskDate');
const addTaskButton = document.getElementById('addTask');
const todoTasksList = document.getElementById('todoTasks');
const completedTasksList = document.getElementById('completedTasks');

// Function to format date and time
function formatDateTime(date) {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return date.toLocaleDateString('en-US', options);
}

// Add a new task
addTaskButton.addEventListener('click', function() {
    const taskText = taskInput.value.trim();
    const taskDateText = taskDateInput.value.trim();

    if (taskText !== '' && taskDateText !== '') {
        const taskDate = new Date(taskDateText);
        if (!isNaN(taskDate)) {
            // Create task element
            const taskElement = document.createElement('li');
            taskElement.innerHTML = `
                <input type="checkbox">
                ${taskText} - ${formatDateTime(taskDate)}
                <button>Delete</button>
            `;

            // Clear input fields
            taskInput.value = '';
            taskDateInput.value = '';

            // Add delete functionality to the task
            const deleteButton = taskElement.querySelector('button');
            deleteButton.addEventListener('click', function() {
                taskElement.remove();
            });

            // Add task to the To-Do list
            todoTasksList.appendChild(taskElement);

            // Checkbox functionality
            const checkbox = taskElement.querySelector('input[type="checkbox"]');
            checkbox.addEventListener('change', function() {
                if (checkbox.checked) {
                    // Move task to the Completed list
                    completedTasksList.appendChild(taskElement);
                    // Cross out the task text
                    taskElement.style.textDecoration = 'line-through';
                } else {
                    // Move task back to the To-Do list
                    todoTasksList.appendChild(taskElement);
                    // Remove the text decoration
                    taskElement.style.textDecoration = 'none';
                }
            });
        } else {
            alert('Invalid date and time format. Please use a valid format, like "YYYY-MM-DDTHH:mm".');
        }
    }
});
