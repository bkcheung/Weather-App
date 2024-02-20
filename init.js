const threshold = 800;
export function pageInit() {
  initDisplayType();
  resizeHandling();
}
function initDisplayType() {
  const page = document.getElementById("page");
  const weather = document.getElementById("weather");
  const location = document.getElementById("location");
  const current = document.getElementById("current");
  const resultDrop = document.getElementById("resultDrop");
  if (window.innerWidth < threshold) {
    page.classList.add("narrow");
    weather.classList.add("narrow");
    location.classList.add("narrow");
    current.classList.add("narrow");
    resultDrop.classList.add("narrow");
  }
}
function resizeHandling() {

  window.addEventListener("resize", () => {
    const page = document.getElementById("page");
    const weather = document.getElementById("weather");
    const location = document.getElementById("location");
    const current = document.getElementById("current");
    const resultDrop = document.getElementById("resultDrop");
    if (window.innerWidth < threshold) {
      const dayTiles = document.querySelectorAll("div.dayTile");
      page.classList.add("narrow");
      weather.classList.add("narrow");
      location.classList.add("narrow");
      current.classList.add("narrow");
      resultDrop.classList.add("narrow");
      dayTiles.forEach((item) => {
        item.classList.add("narrow");
      });
    }
    if (window.innerWidth > threshold) {
      const dayTiles = document.querySelectorAll("div.dayTile");
      page.classList.remove("narrow");
      weather.classList.remove("narrow");
      location.classList.remove("narrow");
      current.classList.remove("narrow");
      resultDrop.classList.remove("narrow");
      dayTiles.forEach((item) => {
        item.classList.remove("narrow");
      });
    }
  });
}


