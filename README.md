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
