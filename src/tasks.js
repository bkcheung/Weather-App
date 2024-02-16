import { dispAllTasks, dispTodayTasks } from "./home";
const dayjs = require("dayjs");

export function createTask(title, dueDate, priority, taskID, projID) {
  return {
    title,
    dueDate: dayjs(dueDate).format("MM/DD/YYYY"),
    priority,
    taskID,
    projID,
    complete: false,
  };
}
export function renderTask(task) {
  const taskItem = document.createElement("li");
  taskItem.classList.add("task");
  taskItem.setAttribute("taskID", task.taskID);
  taskItem.setAttribute("projID", task.projID);

  const taskMain = document.createElement("div");
  taskMain.classList.add("taskMain");

  const checkBox = document.createElement("button");
  if (task.complete) {
    checkBox.classList.add("checked");
    taskItem.classList.add("completed");
  } else {
    checkBox.classList.add("unchecked");
  }
  checkBox.addEventListener("click", (e) => {
    toggleComplete(e, task);
  });

  const taskText = document.createElement("div");
  taskText.innerHTML = task.title;
  taskText.classList.add("taskText");

  const dDate = document.createElement("div");
  dDate.innerHTML = task.dueDate;

  const modButton = document.createElement("button");
  modButton.classList.add("modButton");
  modButton.addEventListener("click", (e) => {
    toggleTaskMod(e);
  });

  const delButton = document.createElement("button");
  delButton.classList.add("delButton");
  delButton.addEventListener("click", (e) => {
    deleteTask(e);
  });

  switch (task.priority) {
    case "High":
      taskItem.setAttribute("style", "border-left: 4px solid red");
      break;
    case "Med":
      taskItem.setAttribute("style", "border-left: 4px solid orange");
      break;
    case "Low":
      taskItem.setAttribute("style", "border-left: 4px solid green");
      break;
  }
  const modForm = taskModForm(task);

  taskMain.appendChild(checkBox);
  taskMain.appendChild(taskText);
  taskMain.appendChild(dDate);
  taskMain.appendChild(modButton);
  taskMain.appendChild(delButton);
  taskItem.appendChild(taskMain);
  taskItem.appendChild(modForm);

  return taskItem;
}
export function renderProjTasks(projID) {
  let projList = JSON.parse(localStorage.getItem("projList"));
  let pIndex = projList.findIndex((item) => {
    if (item.projID === Number(projID)) return true;
  });
  const project = projList[pIndex];
  const taskList = document.getElementById("taskList");
  const projTitle = document.getElementById("dispProj");
  projTitle.innerHTML = project.projName;
  projTitle.setAttribute("projID", project.projID);
  clearTasks();
  const tasks = project.taskList;
  for (let i = 0; i < tasks.length; i++) {
    taskList.appendChild(renderTask(tasks[i]));
  }
  return;
}

function taskModForm(task) {
  const tmodForm = Object.assign(document.createElement("form"), {
    classList: "taskModForm hidden",
  });
  const tmodTop = Object.assign(document.createElement("div"), {
    classList: "newTaskBody",
  });
  const modTitle = Object.assign(document.createElement("input"), {
    type: "text",
    classList: "newTaskTitle",
    value: `${task.title}`,
  });
  const modDate = Object.assign(document.createElement("input"), {
    type: "date",
    classList: "dueDateSet",
    value: `${dayjs(task.dueDate).format("YYYY-MM-DD")}`,
  });
  tmodTop.appendChild(modTitle);
  tmodTop.appendChild(modDate);
  tmodForm.appendChild(tmodTop);
  const modButtons = Object.assign(document.createElement("div"), {
    classList: "newTaskButtons",
  });
  const modDropDown = Object.assign(document.createElement("div"), {
    classList: "dropDown",
  });
  const prioritySel = Object.assign(document.createElement("div"), {
    classList: "prioritySel",
    innerHTML: `${task.priority}`,
  });
  const dropContent = Object.assign(document.createElement("div"), {
    classList: "dropContent",
  });
  const lowButton = Object.assign(document.createElement("button"), {
    classList: "lowButton",
    innerHTML: "Low",
  });
  lowButton.addEventListener("click", (e) => {
    prioritySel.innerHTML = "Low";
    e.preventDefault();
  });
  const medButton = Object.assign(document.createElement("button"), {
    classList: "medButton",
    innerHTML: "Med",
  });
  medButton.addEventListener("click", (e) => {
    prioritySel.innerHTML = "Med";
    e.preventDefault();
  });
  const hiButton = Object.assign(document.createElement("button"), {
    classList: "hiButton",
    innerHTML: "High",
  });
  hiButton.addEventListener("click", (e) => {
    prioritySel.innerHTML = "High";
    e.preventDefault();
  });
  const modButton = Object.assign(document.createElement("button"), {
    type: "submit",
    innerHTML: "Modify",
    classList: "submit",
  });
  modButton.addEventListener("click", (e) => {
    processModTask(e);
  });

  dropContent.appendChild(lowButton);
  dropContent.appendChild(medButton);
  dropContent.appendChild(hiButton);
  modDropDown.appendChild(prioritySel);
  modDropDown.appendChild(dropContent);
  modButtons.appendChild(modDropDown);
  modButtons.appendChild(modButton);
  tmodForm.appendChild(modButtons);
  return tmodForm;
}
export function clearTasks() {
  let tasks = document.getElementsByTagName("li");
  for (let i = tasks.length - 1; i > -1; i--) {
    tasks[i].remove();
  }
}
export function processTask(e) {
  let taskID = Number(localStorage.getItem("taskID"));
  const title = document.getElementById("newTitle");
  if (title !== "") {
    e.preventDefault();
    const date = document.getElementById("dueDate");
    let dateV = date.value;
    if (dateV === "") {
      dateV = new Date();
    }
    const priority = document.getElementById("taskPriority");
    const projID = Number(
      document.getElementById("dispProj").getAttribute("projID"),
    );
    const addTask = createTask(
      title.value,
      dateV,
      priority.getAttribute("data-value"),
      taskID,
      projID,
    );
    taskID++;
    localStorage.setItem("taskID", taskID);
    storeTask(addTask);
    //Reset fields
    title.value = "";
    date.value = null;
    priority.textContent = "Priority";
    priority.setAttribute("data-value", "Low");
  }
}
function processModTask(e) {
  e.preventDefault();
  const modTask = e.target.closest("form[class=taskModForm]");
  const modTitle = modTask.querySelector(".newTaskTitle").value;
  let modDate = modTask.querySelector(".dueDateSet").value;
  const modP = modTask.querySelector(".prioritySel").innerHTML;

  const projList = JSON.parse(localStorage.getItem("projList"));
  const taskID = e.target.closest("li").getAttribute("taskID");
  const projID = e.target.closest("li").getAttribute("projID");
  //Update in storage
  let pIndex = projList.findIndex((item) => {
    if (item.projID === Number(projID)) return true;
  });
  let taskList = projList[pIndex].taskList;
  let tIndex = taskList.findIndex((item) => {
    if (item.taskID === Number(taskID)) return true;
  });
  const task = taskList[tIndex];
  task.title = modTitle;
  task.dueDate = dayjs(modDate).format("MM/DD/YYYY");
  task.priority = modP;

  localStorage.setItem("projList", JSON.stringify(projList));
  toggleTaskMod(e);
  refreshPage();
}
function deleteTask(e) {
  let selectedTask = e.target.closest("li");
  let projID = selectedTask.getAttribute("projID");
  let projList = JSON.parse(localStorage.getItem("projList"));
  let pIndex = projList.findIndex((item) => {
    if (item.projID === Number(projID)) return true;
  });
  let taskKey = Number(selectedTask.getAttribute("taskID"));
  let taskList = projList[pIndex].taskList;
  for (let i = taskList.length - 1; i > -1; i--) {
    if (Number(taskList[i].taskID) === taskKey) {
      projList[pIndex].taskList.splice(i, 1);
      localStorage.setItem("projList", JSON.stringify(projList));
    }
  }
  refreshPage();
}
function toggleTaskMod(e) {
  const task = e.target.closest("li");
  const taskMain = task.querySelector(".taskMain");
  const modForm = task.querySelector(".taskModForm");
  modForm.classList.toggle("hidden");
  taskMain.classList.toggle("hidden");
}
function toggleComplete(e, task) {
  task.complete = !task.complete;
  const currTask = e.target.closest("li");
  currTask.classList.toggle("completed");
  const checkBox = e.target;
  checkBox.classList.toggle("checked");
  checkBox.classList.toggle("unchecked");
  saveTask(task);
}
function storeTask(task) {
  const projID = task.projID;
  let projList = JSON.parse(localStorage.getItem("projList"));
  let pIndex = projList.findIndex((item) => {
    if (item.projID === Number(projID)) return true;
  });
  let taskList = projList[pIndex].taskList;
  taskList.push(task);
  localStorage.setItem("projList", JSON.stringify(projList));
  renderProjTasks(projID);
}
function saveTask(task) {
  const projList = JSON.parse(localStorage.getItem("projList"));
  const projID = task.projID;
  const pIndex = projList.findIndex((item) => {
    if (item.projID === Number(projID)) return true;
  });
  const taskList = projList[pIndex].taskList;
  const taskID = task.taskID;
  let tIndex = taskList.findIndex((item) => {
    if (item.taskID === Number(taskID)) return true;
  });
  //Update in storage
  taskList[tIndex] = task;
  localStorage.setItem("projList", JSON.stringify(projList));
}

function refreshPage() {
  const pageID = document.getElementById("dispProj").getAttribute("projID");
  if (pageID === "0") {
    dispAllTasks();
  } else if (pageID === "1") {
    dispTodayTasks();
  } else {
    renderProjTasks(pageID);
  }
}
