import { processTask } from "./tasks";
import { processProject, renderProjList } from "./projects";
import { listStorage } from "./storage";
import { dispAllTasks, dispTodayTasks } from "./home";

export function pageInit() {
  listStorage();
  renderProjList();
  dispAllTasks();
  hideTaskAdd();

  const menu = document.getElementById("menu");
  const pageLeft = document.getElementById("pageLeft");
  const allTasks = document.getElementById("allTasks");
  const today = document.getElementById("today");
  const prioritySel = document.getElementById("taskPriority");
  const lowButton = document.getElementById("lowButton");
  const medButton = document.getElementById("medButton");
  const hiButton = document.getElementById("hiButton");
  const submit = document.getElementById("addTaskButton");
  const addProj = document.getElementById("addProj");
  const addProjSubmit = document.getElementById("subProj");
  const addTask = document.getElementById("addTask");
  const newTitle = document.getElementById("newTitle");
  const newProj = document.getElementById("newProj");

  menu.addEventListener("click", () => {
    pageLeft.classList.toggle("hidden");
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth < 600) {
      pageLeft.classList.add("hidden");
    }
    if (window.innerWidth > 600) {
      pageLeft.classList.remove("hidden");
    }
  });
  addProj.addEventListener("click", () => {
    toggleProjAdd();
    document.getElementById("newProj").focus();
  });
  addProjSubmit.addEventListener("click", (e) => {
    processProject(e);
    toggleProjAdd();
    renderProjList();
  });
  newProj.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      processProject(e);
      toggleProjAdd();
      renderProjList();
    }
    if (e.key === "Escape") {
      toggleProjAdd();
    }
  });
  allTasks.addEventListener("click", () => {
    dispAllTasks();
    hideTaskAdd();
  });
  today.addEventListener("click", () => {
    dispTodayTasks();
    hideTaskAdd();
  });
  addTask.addEventListener("click", () => {
    toggleTaskAdd();
    document.getElementById("newTitle").focus();
  });
  lowButton.addEventListener("click", (e) => {
    prioritySel.setAttribute("data-value", "Low");
    prioritySel.textContent = "Low";
    e.preventDefault();
  });
  medButton.addEventListener("click", (e) => {
    prioritySel.setAttribute("data-value", "Med");
    prioritySel.textContent = "Med";
    e.preventDefault();
  });
  hiButton.addEventListener("click", (e) => {
    prioritySel.setAttribute("data-value", "High");
    prioritySel.textContent = "High";
    e.preventDefault();
  });
  submit.addEventListener("click", (e) => {
    processTask(e);
    toggleTaskAdd();
  });
  newTitle.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      processTask(e);
      toggleTaskAdd();
    }
    if (e.key === "Escape") {
      toggleTaskAdd();
    }
  });
}
function toggleTaskAdd() {
  const addTask = document.getElementById("addTask");
  const addTaskForm = document.getElementById("newTaskInput");
  addTask.classList.toggle("hidden");
  addTaskForm.classList.toggle("hidden");
}
function toggleProjAdd() {
  const addProj = document.getElementById("addProj");
  const addProjForm = document.getElementById("projForm");
  addProj.classList.toggle("hidden");
  addProjForm.classList.toggle("hidden");
}

function hideTaskAdd() {
  const taskAddSection = document.getElementById("addTaskSection");
  taskAddSection.classList.add("hidden");
}
