// ui-components.js

// Example function to create an input field
/**
 * 
 * @param {String} type 
 * @param {String} id 
 * @param {String} placeholder 
 * @returns 
 */
function createInputField(type, id, placeholder = '') {
    const input = document.createElement('input');
    input.setAttribute('type', type);
    input.setAttribute('id', id);
    input.setAttribute('placeholder', placeholder);
    return input;
}

function createDescTaskArea(id, placeholder = 'Enter Task Description') {
    const textArea = document.createElement('textarea');
    textArea.setAttribute('id', id);
    textArea.setAttribute('placeholder', placeholder);
    textArea.setAttribute('rows', '5');
    textArea.setAttribute('cols', '33');

    return textArea;
}

// Example function to create a button
/**
 * 
 * @param {String} id 
 * @param {String} className 
 * @param {String} textContent 
 * @param {String} type 
 * @returns 
 */
function createButton(id, className, textContent, type = 'button') {
    const button = document.createElement('button');
    button.setAttribute('id', id);
    button.setAttribute('class', className);
    button.setAttribute('type', type);
    button.textContent = textContent;
    return button;
}

/**
 * create task form UI for adding & editing task
 * default parameters for Task; insert arguments for Editing Task
 * @param {String} mode 
 * @param {Object} task 
 */
function createTaskForm(mode = 'add', task = {}) {
    const form = document.createElement('form');
    // TODO Set common form attributes and add input fields using createInputField()
    form.setAttribute("id", "task-form");
    form.setAttribute('class', 'task-list-item');
    form.setAttribute('method', 'get');

    return form;
};

// Exporting functions so they can be used in other files
export { createInputField, createButton, createTaskForm, createDescTaskArea };