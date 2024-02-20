const threshold = 800;
export function pageInit() {
  initDisplayType();
  resizeHandling();
}
function initDisplayType() {
  const weather = document.getElementById("weather");
  const page = document.getElementById("page");
  const current = document.getElementById("current");
  const resultDrop = document.getElementById("resultDrop");
  if (window.innerWidth < threshold) {
    weather.classList.add("narrow");
    page.classList.add("narrow");
    current.classList.add("narrow");
    resultDrop.classList.add("narrow");
  }
}
function resizeHandling() {
  const weather = document.getElementById("weather");
  const page = document.getElementById("page");
  const current = document.getElementById("current");
  const resultDrop = document.getElementById("resultDrop");
  window.addEventListener("resize", () => {
    if (window.innerWidth < threshold) {
      const dayTiles = document.querySelectorAll("div.dayTile");
      weather.classList.add("narrow");
      page.classList.add("narrow");
      current.classList.add("narrow");
      resultDrop.classList.add("narrow");
      dayTiles.forEach((item) => {
        item.classList.add("narrow");
      });
    }
    if (window.innerWidth > threshold) {
      const dayTiles = document.querySelectorAll("div.dayTile");
      weather.classList.remove("narrow");
      page.classList.remove("narrow");
      current.classList.remove("narrow");
      resultDrop.classList.remove("narrow");
      dayTiles.forEach((item) => {
        item.classList.remove("narrow");
      });
    }
  });
}
