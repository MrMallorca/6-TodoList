
class ProjectTask {
    constructor(title, notes,completed = false) {
        this.title = title;
        this.notes = notes;
        this.completed = completed;
    }
}

let tasksStore = [];
let selectedTask = null;
let selectedTaskElement = null;


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
                    <div>
                        <input type="text" id="pTask" name="addTaskInbput" placeholder="+ Add task">
                    </div>

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
                        <h2 for="ptitle"></h2>
                    </div>
                    <div class="notes-section">
                        <h2 for="pnotes">Notes</h2>
                        <textarea rows="5" cols="33" id="pNotes" name="notes" placeholder="Add your notes here"></textarea>
                    </div>
                    <div class="actions">
                        <button id="add-notes-btn">Add notes</button>
                    </div>
                </div>
            </div> `;  
    content.appendChild(projectTitle);        
    content.appendChild(projectCard);

    loadLocalStorage();
    renderTask();
    bindEvents();
}


function createTask()
{
    // Save task using the constructor
        const titleInput = document.getElementById('pTask');
   
        const title = (titleInput?.value || '').trim();

        if (!title) return;

        const task = new ProjectTask(title, '');

        titleInput.value = '';

        saveTask(task);

        renderTask();
    
}
function saveTask(task)
{
    tasksStore.push(task);
    saveLocalStorage();

    console.log('Saved task:', task);
    console.log('All tasks:', tasksStore);
}


function renderTask()
{
    const taskListContainer = document.querySelector('.task-list');
    taskListContainer.innerHTML = ''; 
    for(const task of tasksStore)
    {
        addTaskDOM(document.querySelector('.section-left .task-card .task-list'), task);
    }
}

function updateTaskNotes()
{
    // Save notes using the constructor
        const notesInput = document.getElementById('pNotes');

        const notes = (notesInput?.value || '').trim();

        if (!notes || !selectedTask) return;

        selectedTask.notes = notes;

        saveLocalStorage();
        console.log('Saved notes:', notes);
        console.log('All tasks:', tasksStore);
}


function addTaskDOM(taskTarget, task)
{
    const taskElement = document.createElement('div');
    taskElement.classList.add('task-item');
    taskElement.innerHTML = `
        <input type="checkbox" id="taskCheck">
        <label> ${task.title}</label>
    `;

    taskElement.addEventListener("click", () => {
    if (selectedTaskElement) {
    selectedTaskElement.classList.remove("selected");
    }

    selectedTask = task;
    selectedTaskElement = taskElement;

    selectedTaskElement.classList.add("selected");

    const targetTitle = document.querySelector('.task-details');
    targetTitle.querySelector('h2').textContent = task.title;

    document.getElementById('pNotes').value = task.notes;

    });

    const sectionRight = document.querySelector('.section-right');
    const inputCheck = taskElement.querySelector('input');
    const label = taskElement.querySelector('label');

    inputCheck.checked = task.completed;

    if (task.completed) {
        label.classList.add('completed');
        sectionRight.classList.add('notInteractable');
    }

    inputCheck.addEventListener('change', () =>
    {
        task.completed = inputCheck.checked;
        saveLocalStorage();

        if (task.completed)
        {
            sectionRight.classList.add('notInteractable');
            label.classList.add('completed');
        }
        else
        {
            sectionRight.classList.remove('notInteractable');
            label.classList.remove('completed');
        }
    });
    taskTarget.appendChild(taskElement);
}

function saveLocalStorage()
{
    localStorage.setItem('tasksStore', JSON.stringify(tasksStore));
}

function loadLocalStorage()
{
    const storedTasks = localStorage.getItem('tasksStore');
    if (storedTasks) {
        const parsedTasks = JSON.parse(storedTasks);
        tasksStore = parsedTasks.map(task => new ProjectTask(task.title, task.notes, task.completed ?? false));
    }
}


function bindEvents()
{
    const addTaskBtn = document.getElementById('add-task-btn');

    addTaskBtn.addEventListener('click', createTask);

    const addNotesBtn = document.getElementById('add-notes-btn');
        
    addNotesBtn.addEventListener('click', updateTaskNotes);

}


