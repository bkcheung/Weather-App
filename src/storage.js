import { createProj } from "./projects";
import { createTask } from "./tasks";

export function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return e instanceof DOMException;
  }
}

export function listStorage() {
  const defaultProjList = [defaultList()];
  let projList = localStorage.getItem("projList");
  let projID = localStorage.getItem("projID");
  let taskID = localStorage.getItem("taskID");
  projList = JSON.parse(projList || JSON.stringify(defaultProjList));
  projID = projID || 3;
  taskID = taskID || 1;
  localStorage.setItem("projList", JSON.stringify(projList));
  localStorage.setItem("projID", projID);
  localStorage.setItem("taskID", taskID);
  return projList;
}

function defaultList() {
  const newProj = createProj("New Project", 2);
  const defaultTask = createTask("Example Task", new Date(), "Low", 0, 2);
  newProj.taskList.push(defaultTask);
  return newProj;
}
