import { renderProjTasks } from "./tasks";

export function createProj(projName, projID) {
  return {
    projName,
    projID,
    taskList: [],
  };
}
export function renderProjList() {
  const projects = document.getElementById("projList");
  let projList = JSON.parse(localStorage.getItem("projList"));
  clearProjects();
  for (let i = 0; i < projList.length; i++) {
    const project = renderProject(projList[i], "project");
    projects.appendChild(project);
  }
  localStorage.setItem("projList", JSON.stringify(projList));
}
function renderProject(proj, listType) {
  const project = document.createElement("div");
  project.classList.add("project");
  const projTitle = document.createElement("button");
  projTitle.innerHTML = proj.projName;
  projTitle.classList.add("projTitle");
  const projID = proj.projID;
  projTitle.addEventListener("click", () => {
    renderProjTasks(projID);
    showTaskAdd();
  });
  project.appendChild(projTitle);
  if (listType === "project") {
    const modBundle = renderModForm(proj);
    project.appendChild(modBundle[0]);
    project.appendChild(modBundle[1]);
    project.appendChild(modBundle[2]);
    const delProj = document.createElement("button");
    delProj.innerHTML = "x";
    delProj.classList.add("delProj");
    delProj.addEventListener("click", (e) => {
      deleteProj(e);
    });
    delProj.setAttribute("projID", projID);
    project.appendChild(delProj);
  }
  return project;
}
function renderModForm(proj) {
  const modForm = Object.assign(document.createElement("input"), {
    type: "text",
    classList: "modForm hidden",
    value: `${proj.projName}`,
  });
  modForm.addEventListener("keyup", (e) => {
    if (e.key === "Escape") {
      toggleProjMod(e);
    }
    if (e.key === "Enter") {
      saveProjName(e);
    }
  });
  const modFormButton = Object.assign(document.createElement("button"), {
    classList: "modFormButton hidden",
    innerHTML: "↳",
  });
  modFormButton.addEventListener("click", (e) => {
    saveProjName(e);
  });
  const modButton = document.createElement("button");
  modButton.classList.add("projMod");
  modButton.innerHTML = "✎";
  modButton.addEventListener("click", (e) => {
    modProjName(e);
    e.target.closest("div").querySelector(".modForm").focus();
  });
  const modBundle = [modForm, modFormButton, modButton];
  return modBundle;
}
export function processProject(e) {
  e.preventDefault();
  const title = document.getElementById("newProj");
  let projID = Number(localStorage.getItem("projID"));
  storeProject(createProj(title.value, projID));
  projID++;
  localStorage.setItem("projID", projID);
  title.value = "";
}
function storeProject(project) {
  let projList = JSON.parse(localStorage.getItem("projList"));
  projList.push(project);
  localStorage.setItem("projList", JSON.stringify(projList));
}
function deleteProj(e) {
  let projID = Number(e.target.getAttribute("projID"));
  let projList = JSON.parse(localStorage.getItem("projList"));

  for (let i = projList.length - 1; i > -1; i--) {
    if (projList[i].projID === projID) {
      projList.splice(i, 1);
      localStorage.setItem("projList", JSON.stringify(projList));
    }
  }
  renderProjList();
}
function clearProjects() {
  const listProj = document.getElementsByClassName("project");
  for (let i = listProj.length - 1; i > -1; i--) {
    listProj[i].remove();
  }
}
function modProjName(e) {
  toggleProjMod(e);
}
function saveProjName(e) {
  const newName = e.target.closest("div").querySelector(".modForm").value;
  if (newName !== "") {
    //Change name if new name populated, else, no change
    const projID = e.target
      .closest("div")
      .querySelector(".delProj")
      .getAttribute("projID");
    const projList = JSON.parse(localStorage.getItem("projList"));
    let pIndex = projList.findIndex((item) => {
      if (item.projID === Number(projID)) return true;
    });
    projList[pIndex].projName = newName;
    localStorage.setItem("projList", JSON.stringify(projList));
    renderProjList();
  }
  toggleProjMod(e);
}
function toggleProjMod(e) {
  const projDiv = e.target.closest("div");
  const proj = projDiv.querySelector(".projTitle");
  const form = projDiv.querySelector(".modForm");
  const modFormButton = projDiv.querySelector(".modFormButton");
  const modButton = projDiv.querySelector(".projMod");
  const delButton = projDiv.querySelector(".delProj");
  proj.classList.toggle("hidden");
  form.classList.toggle("hidden");
  modFormButton.classList.toggle("hidden");
  modButton.classList.toggle("hidden");
  delButton.classList.toggle("hidden");
}
function showTaskAdd() {
  const taskAddSection = document.getElementById("addTaskSection");
  taskAddSection.classList.remove("hidden");
}
