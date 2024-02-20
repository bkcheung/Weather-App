import "./style.css";
const dayjs = require("dayjs");

searchInit();
getWeather();

async function getWeather(location) {
  try {
    if (location === undefined) {
      location = "Toronto";
    }
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json
                                      ?key=a5a72b44830a4c4d99e135309241502&q=
                                      ${location}&days=3&aqi=yes&alerts=yes`);
    const weather = await response.json();
    renderCurrent(weather);
    clear();
    renderForecast(weather.forecast.forecastday);
  } catch (err) {
    console.log(`Error: ${err}`);
  }
}
function searchInit() {
  const search = document.getElementById("search");
  search.addEventListener("keyup", (e) => {
    searchLocation(e.target.value);
    if (e.key === "Enter") {
      getWeather(e.target.value);
      clearResults();
      document.getElementById("search").value = "";
    }
  });
}
async function searchLocation(value) {
  try {
    const newLoc = await fetch(`https://api.weatherapi.com/v1/search.json
                                ?key=a5a72b44830a4c4d99e135309241502&q=${value}`);
    const response = await newLoc.json();
    searchResults(response);
    return response;
  } catch (err) {
    console.log(`Error: ${err}`);
  }
}
function searchResults(results) {
  clearResults();
  const resultDisp = document.getElementById("resultDrop");
  results.slice(0, 3).forEach((element) => {
    //limit to show 3 results
    const resultButton = document.createElement("button");
    resultButton.innerHTML = `${element.name}, ${element.region}, ${element.country}`;
    resultButton.addEventListener("click", () => {
      getWeather(element.name);
      clearResults();
      document.getElementById("search").value = "";
    });
    resultDisp.appendChild(resultButton);
  });
}
function clearResults() {
  const buttons = document.querySelectorAll("button");
  buttons.forEach((element) => {
    element.remove();
  });
}
function renderCurrent(weather) {
  const location = document.getElementById("location");
  location.innerHTML = weather.location.name;
  const region = document.getElementById("region");
  region.innerHTML = `${weather.location.region} ${weather.location.country}`;
  const icon = document.getElementById("icon");
  icon.src = weather.current.condition.icon;
  const condition = document.getElementById("condition");
  condition.innerHTML = weather.current.condition.text;
  const temp = document.getElementById("temp");
  temp.innerHTML = `${Math.round(weather.current.temp_c)}°C`;
}

function renderForecast(forecast) {
  const forecastSection = document.getElementById("weather");
  for (let i = 0; i < 3; i++) {
    const date = document.createElement("div");
    date.innerHTML = dayjs(forecast[i].date).format("ddd MMM D");
    date.classList.add("title");
    const condition = document.createElement("div");
    condition.innerHTML = forecast[i].day.condition.text;
    const icon = document.createElement("img");
    icon.src = forecast[i].day.condition.icon;
    const temp = document.createElement("div");
    temp.innerHTML = `${Math.round(forecast[i].day.maxtemp_c)}°C / 
                          ${Math.round(forecast[i].day.mintemp_c)}°C`;

    const dayTile = document.createElement("div");
    dayTile.classList.add("dayTile");
    dayTile.appendChild(date);
    dayTile.appendChild(icon);
    dayTile.appendChild(condition);
    dayTile.appendChild(temp);
    forecastSection.appendChild(dayTile);
  }
}
function clear() {
  const weather = document.getElementById("weather");
  const rm = weather.querySelectorAll("div.dayTile");
  if (rm.length > 0) {
    for (let i = 0; i < 3; i++) {
      rm[i].remove();
    }
  }
}
