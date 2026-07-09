
class ProjectTask {
    constructor(title, notes) {
        this.title = title;
        this.notes = notes;
    }
}

const tasksStore = [];
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

    // Save task using the constructor
    const titleInput = document.getElementById('pTask');
    const addTaskBtn = document.getElementById('add-task-btn');

    addTaskBtn.addEventListener('click', () => {    
        const title = (titleInput?.value || '').trim();

        if (!title) return;

        const task = new ProjectTask(title, '');
        tasksStore.push(task);

        const target = document.querySelector('.section-left .task-card .task-list');
        if (target) addTask(target, task);

        titleInput.value = '';

        console.log('Saved task:', task);
        console.log('All tasks:', tasksStore);
    });

    // Save notes using the constructor
    const notesInput = document.getElementById('pNotes');
    const addNotesBtn = document.getElementById('add-notes-btn');

    addNotesBtn.addEventListener('click', () => {
        const notes = (notesInput?.value || '').trim();

        if (!notes || !selectedTask) return;

        selectedTask.notes = notes;
        console.log('Saved notes:', notes);
        console.log('All tasks:', tasksStore);

    });
}

function addTask(taskTarget, task)
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
    inputCheck.addEventListener('change', () =>
    {
        if(inputCheck.checked)
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

function addNotes(target)
{

}






