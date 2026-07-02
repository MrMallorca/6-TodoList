
class ProjectTask {
    constructor(title, notes) {
        this.title = title;
        this.notes = notes;
    }
}

const tasksStore = [];
let selectedTask = null;

function loadProjects() {

    const content = document.getElementById('content');

    content.innerHTML = '';  // Clear existing content

    const projectTitle = document.createElement('h1');
    const projectCard = document.createElement('div');

    projectTitle.style.color = 'white';
    projectTitle.textContent = `Start a project. ¿How would like to call it?`;

    projectCard.classList.add('task-sections');
    projectCard.innerHTML = `
            <div class="section-left">
                <div class="task-card">
                    <label>Today</label>
                    <div class="task-list">

                    </div>
                    <section>
                        <input type="text" id="pTask" name="addTaskInbput" placeholder="+ Add task">
                    </section>

                    <div class="actions">
                        <button id="add-task-btn">Add task</button>
                    </div>
                </div>
            </div>
            <div class="section-right">
                <div class="task-card">
                    <div class="card-header">
                        <span class="breadcrumb"> My lists > Personal</span>
                    </div>

                    <div class="task-details">
                        <label for="ptitle"></label>
                    </div>
                    <section>
                        <label for="pnotes">Notes</label>
                        <input type="text" id="pnotes" name="notes" placeholder="Add your notes here">
                    </section>
                </div>
            </div> `;  
    content.appendChild(projectTitle);        
    content.appendChild(projectCard);

    // Save task using the constructor
    const titleInput = document.getElementById('pTask');
    const notesInput = document.getElementById('pnotes');
    const addBtn = document.getElementById('add-task-btn');

    addBtn.addEventListener('click', () => {
        const title = (titleInput?.value || '').trim();
        const notes = (notesInput?.value || '').trim();

        if (!title) return;

        const task = new ProjectTask(title, notes);
        tasksStore.push(task);

        const target = document.querySelector('.section-left .task-card .task-list');
        if (target) addTask(target, task);

        titleInput.value = '';
        notesInput.value = '';

        console.log('Saved task:', task);
        console.log('All tasks:', tasksStore);
    });
}

function addTask(target, task)
{
    const taskElement = document.createElement('div');
    taskElement.classList.add('task-item');
    taskElement.innerHTML = `
        <input type="radio" name="taskCheck" value="task">
        <label> ${task.title}</label>
    `;

    taskElement.addEventListener("click", () => {
    if (selectedTask) {
    selectedTask.classList.remove("selected");
    }

    taskElement.classList.add("selected");
    selectedTask = taskElement;

    const target = document.querySelector('.task-details');
    target.querySelector('label').textContent = task.title;
    });

    target.appendChild(taskElement);
}






