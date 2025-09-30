//Here i get the elements
const form = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const taskList = document.querySelector(".task-list");

// Function to update task statistics so we can see how many tasks are there and how many are completed
function updateStats() {
  const totalTasks = taskList.querySelectorAll(".task-item").length;
  const completedTasks = taskList.querySelectorAll(
    ".task-item.completed"
  ).length;

  document.getElementById("total-tasks").textContent = `${totalTasks} Tasks`;
  document.getElementById(
    "completed-tasks"
  ).textContent = `${completedTasks} Completed`;
}

// Event listener for form submission
form.addEventListener("submit", function (e) {
  e.preventDefault(); //So that the form is not submitted in the default way

  const data = taskInput.value.trim(); //from the input box that we accessed earlier in the taskInput variable

  if (data) {
    //If there is some data in the input box
    // Create a new list item //to add a new task to the list
    const nli = document.createElement("li");
    nli.classList.add("task-item"); //adding the class task-item to the new element so that it gets the same styling as other tasks
    nli.innerHTML = `
            <input type="checkbox" class="task-checkbox"> 
            <div>
                <p class="task-text">${data}</p>
            </div>
            <button class="task-delete">
                <i class="fas fa-trash-alt"></i>
            </button>`; //here we copied the inner html of other tasks and replaced the task text with the new task text so same styling is applied

    // Append the new task element that we created to the task list
    taskList.appendChild(nli);

    // Clear the input field
    taskInput.value = ""; //resetting the input box to empty string so that we can add a new task

    // Update the stats
    updateStats();
  }
});

// Event delegation for delete buttons- that is we add a single event listener to the parent element (taskList) and check if the clicked element is a delete button
taskList.addEventListener("click", function (e) {
  // Check if the clicked element is a delete button or a child of it (like the icon)
  if (e.target.closest(".task-delete")) {
    // Find the parent task item (li)
    const taskItem = e.target.closest(".task-item");
    if (taskItem) {
      taskItem.remove();
      updateStats();
    }
  }
});

// Event delegation for checkboxes- to mark tasks as completed or not, accessing the parent element (taskList) and checking if the clicked element is a checkbox
taskList.addEventListener("change", function (e) {
  if (e.target.classList.contains("task-checkbox")) {
    const taskItem = e.target.closest(".task-item");
    if (taskItem) {
      taskItem.classList.toggle("completed");
      updateStats();
    }
  }
});

// Initialize stats on page load
updateStats();
