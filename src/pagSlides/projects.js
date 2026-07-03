
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
                        <label for="ptitle"></label>
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

        if (!notes) return;
        
        addNotes(notes);

        notesInput.value = '';
        console.log('Saved notes:', notes);
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

function addNotes()
{

}






