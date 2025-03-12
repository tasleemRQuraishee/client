

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CompilerSliceStateType {
  fullCode: {
    html: string;
    css: string;
    javascript: string;
  };
  currentLanguage: "html" | "css" | "javascript";

  //
  // Added currentCode to the state
}

const initialState: CompilerSliceStateType = {
  fullCode: {
    html: `
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>To-Do List</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">
    <h1>To-Do List</h1>
    <input type="text" id="taskInput" placeholder="Enter a task">
    <button id="addButton">Add Task</button>
    <ul id="taskList"></ul>
  </div>

  <script src="script.js"></script>
</body>
</html>

    `,
    css: `
    * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.container {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 300px;
}

h1 {
  text-align: center;
  color: #333;
}

input[type="text"] {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  display: flex;
  justify-content: space-between;
  padding: 8px;
  margin: 5px 0;
  background-color: #f9f9f9;
  border-radius: 4px;
  align-items: center;
}

li.completed {
  text-decoration: line-through;
  color: #888;
}

li button {
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

li button:hover {
  background-color: #c0392b;
}

    `,
    javascript: `
    // Get references to the DOM elements
const addButton = document.getElementById('addButton');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Function to add a new task
function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText === '') {
    alert('Please enter a task!');
    return;
  }

  // Create a new list item
  const li = document.createElement('li');
  li.textContent = taskText;

  // Create a button to delete the task
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.onclick = function() {
    taskList.removeChild(li);
  };

  // Create a button to mark the task as completed
  const completeButton = document.createElement('button');
  completeButton.textContent = 'Complete';
  completeButton.onclick = function() {
    li.classList.toggle('completed');
  };

  // Append the buttons to the list item
  li.appendChild(completeButton);
  li.appendChild(deleteButton);

  // Add the new task to the list
  taskList.appendChild(li);

  // Clear the input field
  taskInput.value = '';
}

// Event listener for the "Add Task" button
addButton.addEventListener('click', addTask);

// Optional: Allow pressing 'Enter' to add a task
taskInput.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    addTask();
  }
});

    `,
  },
  currentLanguage: "html",

  //
};

const compilerSlice = createSlice({
  name: "compilerSlice",
  initialState,
  reducers: {
    updateCurrentLanguage: (
      state,
      action: PayloadAction<CompilerSliceStateType["currentLanguage"]>
    ) => {
      state.currentLanguage = action.payload;
    },
    updateCodeValue: (state, action: PayloadAction<string>) => {
      // state.fullCode[state.currentLanguage]= action.payload;
      state.fullCode[state.currentLanguage] = action.payload;
    },
  },
});

export default compilerSlice.reducer;
export const { updateCurrentLanguage, updateCodeValue } = compilerSlice.actions;
