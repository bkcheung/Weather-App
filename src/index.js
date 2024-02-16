import "./style.css";
import { pageInit } from "./init";
import { storageAvailable } from "./storage";

//Check for existing data from storage
if (storageAvailable("localStorage")) {
  console.log("Local storage is available!");
}
pageInit();
