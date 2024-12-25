# ToDoList Application Documentation

## Overview  
In this ToDoList Application, I will use the **DOM API**, **Web Storage API**, and **IndexedDB API** to save a user's notes like a database.  
[www.jsdoc.app](https://www.jsdoc.app) is really good for documentation, comments, and defining types in this JavaScript app. I am currently applying **JSDoc** in this project for integrity and readability.  

I am reaching the limitations of LocalStorage. Using a database such as **IndexedDB** would help simplify unique identifiers for each task, enabling users to edit and delete tasks, and for admins to keep track of storage. LocalStorage only holds strings.

---

### Development Notes  

- **Aug 6th**:  
  For this project, we will only store strings while trying to use `Map()`, I hope?  

- **Aug 7th**:  
  Easy pz. Needs debugging. Otherwise, using `Map()` and LocalStorage is going well.  

- **Aug 6th**:  
  We can store objects in LocalStorage.  

- **Aug 30th**:  
  Successfully implemented edit task and delete task functionality.  

---

### Features  
- Project uses **LocalStorage** with `Map()` to store **Key (k) / Value (v)** pairs:  
  - **Key**: Task's identifier.  
  - **Value**: The task object.  

**Example**:  
The `saveTask` function saves a task to a map in LocalStorage with the structure: `(taskId, taskObject)`.  

Each task object contains the following properties:  
- `id`: Unique identifier.  
- `title`: Task title.  
- `desc`: Task description.  
- `date`: Task creation date.  

For creating unique identifiers, I use the `Date` with a random number.

---

### Sources  
- [Waiting for an Element to Exist with JavaScript](https://www.basedash.com/blog/waiting-for-an-element-to-exist-with-javascript)  
- [3 Typical Ways to Store Data Using JavaScript](https://dev.to/stevealila/3-typical-ways-to-store-data-using-javascript-1m1f)  
- [LocalStorage in JavaScript: A Complete Guide](https://blog.logrocket.com/localstorage-javascript-complete-guide/#storing-setting-objects)  

---

### TODO Features  
- Add Filter By / Sort By Feature (use a sort algorithm).  
- Add HTML Element to display Date.  
- Cancel button for editing task updates the date.

---

### Completed Features  
- **Display Create Task Element to the Top**  
- **HTML/CSS**: Bring stored tasks that are displayed on the UI into the proper "notes" element.  
- **Add an Edit and Delete Button for Each Task** (Medium priority).  
- **Create Unique Identifiers**: No more simple index 0 identifiers (Low priority).  
- **Add a `Date()` When Task is Created** (Low priority).

---

### Productivity Tracker  
Check [pomofocus.io](https://pomofocus.io) for time spent on this project.