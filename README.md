# ToDoList Application Documentation  

## Overview  
This ToDoList application leverages the **DOM API**, **Web Storage API**, and **IndexedDB API** to store user tasks like a lightweight database. The goal is to provide functionality for creating, editing, and deleting tasks while ensuring data persistence.

## Features  
### Current Functionality:  
- **Task Storage**:  
  - Tasks are stored as key-value pairs in LocalStorage using a `Map()`.  
    - **Key**: Unique task identifier (generated using `Date` + a random number).  
    - **Value**: Task object containing the following properties:  
      - `id`: Unique identifier.  
      - `title`: Task title.  
      - `desc`: Task description.  
      - `date`: Task creation date.  

- **Edit and Delete Tasks**:  
  - Users can modify or remove tasks directly from the interface.  

- **User Interface Updates**:  
  - Stored tasks are displayed in a structured "notes" element for better readability.

### Planned Features:  
- **Filter By/Sort By**:  
  - Add a sorting feature to organize tasks (e.g., by date or title).  
- **Enhanced Task Details**:  
  - Display the creation date in the UI.  
  - Update the date field dynamically when editing tasks.  
- **Cancel Edit Functionality**:  
  - Ensure editing tasks has a cancel option to revert changes.

---

## Development Notes  

### Aug 6th:  
- Initial exploration of LocalStorage. Discovered its limitations in handling complex data types.  
- Proposed the use of `Map()` to store task objects.  

### Aug 7th:  
- Successfully debugged `Map()` implementation with LocalStorage.  

### Aug 30th:  
- Completed edit and delete task functionality.  

---

## Challenges  
- **LocalStorage Limitations**:  
  - LocalStorage only supports strings, requiring tasks to be stringified.  
  - IndexedDB would simplify handling unique identifiers and data relationships for future scalability.  

---

## Sources and References  
- [Waiting for an element to exist with JavaScript](https://www.basedash.com/blog/waiting-for-an-element-to-exist-with-javascript)  
- [3 Typical Ways to Store Data Using JavaScript](https://dev.to/stevealila/3-typical-ways-to-store-data-using-javascript-1m1f)  
- [LocalStorage in JavaScript: A Complete Guide](https://blog.logrocket.com/localstorage-javascript-complete-guide/#storing-setting-objects)  

---

## Completed Tasks  
- Display the "Create Task" element at the top of the interface.  
- Bring stored tasks into the appropriate UI container.  
- Add edit and delete buttons for each task.  
- Implement unique task identifiers (replaced simple index identifiers).  
- Add a `Date()` field when tasks are created.  

---

## Tools Used  
- **pomofocus.io**: For tracking development time and productivity.  
- **JSDoc**: For enhancing project integrity and readability. (Reference: [www.jsdoc.app](https://jsdoc.app))  


