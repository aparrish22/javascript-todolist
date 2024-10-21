/**
 * Documentation:
 *     In this ToDoList Application, I will use DOM API, Web Storage API, and
 * IndexedDB API to save a user's notes like a database.
 *     www.jsdoc.app is really good for documentation, comments, and defining types
 * in this JavaScript App. I am currently applying jsdoc in this project for 
 * integrity and readability.
 *     I am reaching the limitations of LocalStorage. Using a database such as 
 * IndexedDB would help simplify unique identifiers for each task, enabling user
 * to edit and delete tasks, and for admin to keep track of storage. Localstorage
 * only holds strings. 
 * 
 *     Aug 6th: For this project, we will only store strings while trying to
 * use Map() I hope?
 *     Aug 7th: Easy pz. Needs debugging. Otherwise, using  map and localstorage
 * is going well.
 *     Aug 6th - we can store objects in localstorage ()
 * 
 *      For creating unique identifiers, I will use Date with a random number.
 * 
 *      Aug 30: Successfully implemented edit task and delete task functionality
 * 
 * 
 *      Check pomofocus.io for time spent on this project
 * 
 * README
 * Project uses LocalStorage using Maps with Key (k) /  Value (v) pairs.
 * k = task's identifier
 * v = the task object
 * Example: saveTask function saves a task to a map on LocalStorage of (taskId, taskObject).
 * Each task object contains id, title, desc, date.
 * 
 * Sources:
 *     https://www.basedash.com/blog/waiting-for-an-element-to-exist-with-javascript 
 *     https://dev.to/stevealila/3-typical-ways-to-store-data-using-javascript-1m1f 
 *     https://blog.logrocket.com/localstorage-javascript-complete-guide/#storing-setting-objects
 * 
 *  // TODO - Features:
 *     Add Filter By / Sort By Feature (use a sort algorithm)
 *     Add HTML Element to display Date.
 *     Cancel Btn of Editing task updates the date.
 *      
 *  
 *     COMPLETE - Display Create Task Element to the Top
 *     COMPLETE - HTML/CSS: Bring stored tasks that are displayed on UI into proper 'notes' element
 *     COMPELTE - Add an edit and delete button for each Task (Medium priority)
 *     COMPLETE - Create Unique Identifiers - no more simple index 0 identifiers (Low Priority)
 *     COMPLETE - Add a Date() when task is created.  (low priority)
 * 
 * 
*/

import { createInputField, createButton, createTaskForm, createDescTaskArea } from './ui-components.js';

// error log
// for debugging purposes
var log = String("");

// javascript variables
const taskForm = document.getElementById('create-task-form'); // from html page
const tasksContainer = document.getElementById('tasks');

// INTIAL number of tasks in local storage
var numOfTasks = 0;

// add UI for Adding a Task
taskForm.addEventListener('click', createAddTaskUI);

/**
 * 
 * @param {Map} map - existing map from application's localstorage
 */
function updateNumOfTasks(map) {
    setNumOfTasks(map.size);
};

/**
 * Returns number of tasks as Number
 * @returns {Number}
 */
function getNumOfTasks() {
    return numOfTasks;
};

/**
 * Sets global number of tasks
 * @param {Number} tasks - number of tasks
 */
function setNumOfTasks(tasks) {
    numOfTasks = tasks;
}

/**
 * creates html elements for user to Add a Task 
 * @returns {Object} - { editBtn, deleteBtn } with edit/delete feature
 */
function createAddTaskUI() {

    // create a form dynamically
    var form = document.createElement('form');
    
    // TODO replace with new createForm function
    var form = createTaskForm();

    // add h2 HEADER
    var promptTaskHeader = document.createElement("h2");
    promptTaskHeader.innerHTML = "Create Task";

    // input element of Task's Title
    var textTitle = createInputField('text', 'input-task-title', 'Enter Task Title...');

    // text area element of Task's Description
    var textDesc = createDescTaskArea('input-task-desc');

    // the submit button - submit form
    var submitBtn = createButton('submit-task', 'task-buttons', 'Submit', 'submit'); // submit button

    // cancel btn - if user does not want to create a task at the moment
    var cancelBtn = createButton('cnl-task', 'task-buttons', 'Cancel');

    // assigning labels to match with form id's title & description
    var titleLabel = document.createElement('label');
    var descLabel = document.createElement('label');
    titleLabel.htmlFor = 'input-task-title';
    descLabel.htmlFor = 'input-task-desc';
    titleLabel.innerHTML = "Title";
    descLabel.innerHTML = "Description";

    // list items
    // prepare to append ul and li to our form
    var formUl = document.createElement('ul');
    var titleLi = document.createElement('li');
    var descLi = document.createElement('li');
    var btnLi = document.createElement('li');
    formUl.setAttribute('id', 'task-list');
    formUl.setAttribute('style', 'list-style-type: none;');

    // append labels & 27 areas to corresponding list
    titleLi.append(titleLabel, textTitle);
    descLi.append(descLabel, textDesc);
    btnLi.append(submitBtn, cancelBtn);

    // append task list items to unordered list
    formUl.append(titleLi, descLi, btnLi);

    // append header and unordered list to form
    form.append(promptTaskHeader, formUl);

    // insert task form (user input) at the very beginning - before existing tasks
    tasksContainer.insertBefore(form, tasksContainer.firstChild);

    // display form to html
    //document.getElementById('tasks').appendChild(form);

    // upon clicking submit, add user's task from storage
    form.addEventListener('submit', addTask);

    // upon clicking cancel, remove form
    cancelBtn.addEventListener('click', () => {
        form.remove();
    });

};

/** 
 * creates two buttons to edit or delete a task
 * @param {String} taskid - pass in task's id to assign to it's respective buttons
 * @returns {Object} - return edit and delete button in an object
 */
function createEditDeleteButtons(taskId) {
    const editBtn = createButton('edit-task-btn', 'task-buttons', 'Edit');
    editBtn.setAttribute('data-task-id', taskId); // link button to task id
    
    const deleteBtn = createButton('delete-task-btn', 'task-buttons', 'Delete');
    deleteBtn.setAttribute('data-task-id', taskId);

    // add event listeners to buttons
    editBtn.addEventListener('click', () => {
        const id = editBtn.getAttribute('data-task-id');
        editTask(id);
        console.log('Edit Task button clicked!');
    });
    
    deleteBtn.addEventListener('click', () => {
        // ask user for confirmation if they want to delete Task
        window.confirm('Are you sure you want to delete this task?');
        const id = deleteBtn.getAttribute('data-task-id');
        deleteTask(id);
        console.log('Delete Task Button clicked!');
    });
    
    return { editBtn, deleteBtn };

};

/**
 * 
 * @param {Object} task - {id, title, desc}
 * @returns {HTMLElement} - returns list element for appending on webpage
 */
function createEditDeleteTaskUI(task, listEl) {

    const { editBtn, deleteBtn } = createEditDeleteButtons(task.id);

    // create div container for styling css
    const divButtons = document.createElement('div');
    divButtons.setAttribute('class', 'task-button-container');

    // append buttons to task item
    listEl.append(editBtn, deleteBtn);

    return listEl;

};

// TODO security, prevent html/css/js injections
/**
 * Simple validation for user's task
 * @param {String} title 
 * @param {String} desc 
 * @returns {Boolean} true if valid, false if invalid
 */
function validateTaskInput(title, desc) {
    // Trim the input to remove leading/trailing whitespace
    title = title.trim();
    desc = desc.trim();

    // Check for empty input
    if (title === '' || desc === '') {
        return { valid: false, message: 'Both title and description are required.' };
    }

    // Check for length 
    if (title.length < 3 || title.length > 50) {
        return { valid: false, message: 'Title must be between 3 and 50 characters.' };
    }
    if (desc.length < 5 || desc.length > 1500) {
        return { valid: false, message: 'Description must be between 5 and 200 characters.' };
    }

    // Check for specific characters or formats if needed
    // Example: if you want to disallow numbers in the title
    // if (/[\d]/.test(title)) {
    //     return { valid: false, message: 'Title should not contain numbers.' };
    // }

    // All validations passed
    return { valid: true };
};

function generateTaskID() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
};

/**
 * Creates simple task id for each task
 * @param {Event} event - event handler to add NEW tasks from User Input
 */
const addTask = event => {

    event.preventDefault(); // Prevent form from submitting and refreshing the page

    // SIMPLE ID of NUMBER/INTEGER TYPE (n: 0, 1, 2, n+1 ...)
    const id = generateTaskID();

    // obtaining new elements from submitted form in createAddTaskUI()
    const title = document.getElementById('input-task-title').value;
    const desc = document.getElementById('input-task-desc').value;

    // saving date when task is added
    const date = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });

    // validate user's input for title and description
    const validation = validateTaskInput(title, desc);
    if (!validation.valid) {
        alert(validation.message);
        return;
    }

    // when input is valid, continue to add task
    let li = document.createElement('li');
    let titleHeader = document.createElement('h3');
    let descEl = document.createElement('p');
    
    li.setAttribute('id', id);
    li.setAttribute('data-task-id', id);
    li.setAttribute('class', 'task-list-item');
    titleHeader.setAttribute('class', 'display-title');
    descEl.setAttribute('class', 'display-desc');
    
    
    titleHeader.textContent = `${title}`;
    descEl.textContent = `${desc} + ${date}`; // TODO display date in html elemenet

    li.append(titleHeader, descEl);

    // adding edit and delete buttons to newly added tasks
    // w/o this, new tasks appended on page will not have edit/delete btns
    let newLi = createEditDeleteTaskUI( {id, title, desc, date} , li);

    // add new task item to tasks on page UI
    tasksContainer.append(newLi);
    
    // Save the task to localStorage
    saveTask({ id, title, desc, date });

    // update Number of Tasks in storage
    setNumOfTasks(numOfTasks + 1);

    // Clear the input fields
    document.getElementById('input-task-title').value = '';
    document.getElementById('input-task-desc').value = '';
    
    // remove form after successful completion and validation of submitting task
    const form = document.getElementById('task-form');
    form.remove();
};

/**
 * Save and updates tasks to localStorage Map
 * @param {Object} taskObj - object of {id, title, desc}
 */
const saveTask = taskObj => {

    // returns Map
    const tasks = getTasks();

    // add task to map
    tasks.set(taskObj.id, taskObj); // .set(id, taskObject)

    // store map in localStorage after converting map into JSON for storage
    const mapObj = Object.fromEntries(tasks);
    const mapJSON = JSON.stringify(mapObj);
    localStorage.setItem('Local Storage Task Map', mapJSON);
};

/**
 * Retrieve tasks from localStorage
 * @returns {Map} - returns empty map or map if at least one task in storage
 */
function getTasks() {

    try {  
        // try to retrieve Map JSON from storage
        const storedMap = localStorage.getItem('Local Storage Task Map');

        // convert string (stored map) into map object
        if (storedMap) {
            const parsedObj = JSON.parse(storedMap);
            const mapArr = Object.entries(parsedObj);
            return new Map(mapArr); // parse into Map Object
        } else {
            return new Map(); // Return a new empty Map if nothing is in storage
        }
    } catch (error) {
        alert('Error with tasksMap in function getTasks().');
        log += `${error}\n`
        console.log('Returning Empty Map from \'getTasks()\'');
        return new Map(); // Return a new empty Map in case of error
    }
};

/**
 * O(1) - using map to retrieve & delete
 * @param {String} taskId - id retrieved via data-* attribute
 */
const deleteTask = taskId => {
    const taskMap = getTasks();

    try {
        // the task displayed on page
        const taskEl = document.getElementById(taskId);

        // perform removal/deletion on map 
        taskMap.delete(taskId);

        // convert map for localstorage format
        const newMap = JSON.stringify(Object.fromEntries(taskMap));

        // check if tasks exists then  update local storage
        localStorage.setItem('Local Storage Task Map', newMap);

        // update global task counter
        setNumOfTasks(taskMap.size);
        
        // perform removal/deletion on UI
        taskEl.remove();
    } catch (e) {
        alert('Task could not be deleted');
        log += `Error caught at deleteTask(): ${e}`;
    }
    
};

/**
 * // TODO - there is an easier way to refactor/write this
 *  // creating edit UI on here. needs to be revised & concise
 * // TODO add both original task date AND edit task date
 * O(1) - using map to retrieve & edit
 * @param {*} taskId - id retrieved via data-* attribute
 */
const editTask = taskId => {
    const taskMap = getTasks();
    try {

        // task object
        const taskObj = taskMap.get(taskId);
        const taskTitle = taskObj['title'];
        const taskDesc = taskObj['desc'];
        const taskDate = taskObj['date'];

        const titleEl = document.createElement('h3');
        titleEl.setAttribute('class', 'display-title');

        const descEl = document.createElement('p');
        descEl.setAttribute('class', 'display-desc');

        const formEl = document.createElement('form');
        const formUl = document.createElement('ul');
        const labelTitle = document.createElement('label');
        const labelDesc = document.createElement('label');
        const inputTitle = document.createElement('input');
        const textareaDesc = document.createElement('textarea');
        const saveBtn = document.createElement('button');
        const cancelBtn = document.createElement('button');
        const titleLi = document.createElement('li');
        const descLi = document.createElement('li');
        const btnsLi = document.createElement('li');

        // setting attributes
        formEl.setAttribute('id', 'edit-task-form');
        formEl.setAttribute('class', 'task-list-item');
        formEl.setAttribute('method', 'get');

        formUl.setAttribute('style', 'list-style-type: none;');

        labelTitle.setAttribute('for', 'input-task-title');
        labelTitle.innerHTML = 'Title';
        labelDesc.setAttribute('for', 'input-task-desc');
        labelDesc.innerHTML = 'Description';

        inputTitle.setAttribute('id', 'input-task-title');
        inputTitle.setAttribute('type', 'text');
        inputTitle.setAttribute('value', taskTitle);
        inputTitle.innerHTML = taskTitle;

        textareaDesc.setAttribute('id', 'input-task-desc');
        textareaDesc.setAttribute('rows', '5');
        textareaDesc.setAttribute('cols', '33');
        textareaDesc.setAttribute('placeholder', 'Edit Task Description');
        textareaDesc.innerHTML = taskDesc;

        saveBtn.setAttribute('type', 'submit');
        saveBtn.innerHTML = 'Save';
        cancelBtn.setAttribute('type', 'button');
        cancelBtn.innerHTML = 'Cancel';
        

        titleLi.append(labelTitle, inputTitle);
        descLi.append(labelDesc, textareaDesc);
        btnsLi.append(saveBtn, cancelBtn);

        formUl.append(titleLi, descLi, btnsLi);
        formEl.append(formUl);

        // grab original task element
        const originalTaskLi = document.getElementById(taskId);

        // update task element onto webpage
        originalTaskLi.innerHTML = '';
        originalTaskLi.append(formEl);
        
        // upon clicking submit, add user's task from storage
        formEl.addEventListener('submit', (event) => {
            event.preventDefault(); // prevent form submission

            // grab edited task            
            const titleVal = document.getElementById('input-task-title').value; 
            const descVal = document.getElementById('input-task-desc').value;

            // validate edited task
            const validation = validateTaskInput(titleVal, descVal);
            if (!validation.valid) {
                alert(validation.message);
                return; // exit if validation fails
            }

            // date of edit
            const dateVal = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });

            const newTaskObj = {
                id: taskObj['id'],
                title: titleVal,
                desc: descVal,
                date: dateVal, // date of edit
            };

            // save into local storage
            saveTask(newTaskObj);

            // display task in UI
            updateTaskInUI(newTaskObj);

            formEl.remove();
        
        });

        // remove edit without saving 
        cancelBtn.addEventListener('click', () => {
            updateTaskInUI(taskObj); // original task
            formEl.remove();
        });
            
        // date of edit
        if (typeof taskDate === "undefined") {
            descEl.textContent = `${taskDesc} : No Date to display.`;
        } else {
            descEl.textContent = `${taskDesc} + Edit: ${taskDate}`;
        }
        
    } catch (e) {
        alert('Task could not be edited');
        log += `Error caught at editTask(): ${e}`;
    }
};

function updateTaskInUI(task) {
    // Find the task element by its ID
    const taskLi = document.getElementById(task.id);

    // Clear the current content of the task element
    taskLi.innerHTML = '';

    // Create new elements for updated task data
    const titleEl = document.createElement('h3');
    const descEl = document.createElement('p');

    titleEl.setAttribute('class', 'display-title');
    descEl.setAttribute('class', 'display-desc');

    titleEl.textContent = task.title;
    descEl.textContent = `${task.desc} + ${task.date}`;

    // Append the updated elements to the task list item
    taskLi.append(titleEl, descEl);

    // Re-add the edit and delete buttons
    createEditDeleteTaskUI(task, taskLi);
};

// loads existing tasks onto page from local storage
document.addEventListener('DOMContentLoaded', () => {

    // Load existing todos
    const tasks = getTasks(); // assigns/returns map from storage or returns empty map
    
    // for each task in our map, print it out on the page
    tasks.forEach((val, key) => {
        const currTask = {
            id: key,
            title: val.title,
            desc: val.desc,
            date: val.date,
        }

        // add tasks to webpage
        let li = document.createElement('li');
        let titleEl = document.createElement('h3');
        let descEl = document.createElement('p');

        // setting identifier
        li.setAttribute('id',currTask.id);
        
        // css classes
        li.setAttribute('class', 'task-list-item');
        titleEl.setAttribute('class', 'display-title');
        descEl.setAttribute('class', 'display-desc');

        // assign tasks to respective html element
        titleEl.textContent = `${currTask.title}`;

        // if no date is displayed for older tasks
        if (typeof currTask.date === "undefined") {
            descEl.textContent = `${currTask.desc} : No Date to display.`;
        } else {
            descEl.textContent = `${currTask.desc} + ${currTask.date}`;
        }

        // assign elements to list
        li.append(titleEl, descEl);
        
        // insert edit and delete buttons for each task
        // pass task and list element to add edit & delete buttons
        let newList = createEditDeleteTaskUI(currTask, li);

        // load stored task onto task-list-item
        tasksContainer.appendChild(newList);

        // update number of tasks global var with existing map argument
        updateNumOfTasks(tasks);

    });

});
