import "./style.css"
const dayjs = require('dayjs')

getWeather();

async function getWeather(){
    try{
        const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=a5a72b44830a4c4d99e135309241502&q=Toronto&days=3&aqi=yes&alerts=yes`);
        const weather = await response.json();
        renderCurrent(weather);
        renderForecast(weather.forecast.forecastday);
    } catch(err){
        console.log(`Error: ${err}`);
    }
}

function renderCurrent(weather){
    const page = document.getElementById("weather");
    const location = document.getElementById("location");
    location.innerHTML = weather.location.name;
    const curr = document.createElement("div");
    curr.classList.add('current');
    const title = document.createElement("div");
    title.innerHTML = "Current Conditions";
    const icon = document.createElement("img");
    icon.src = weather.current.condition.icon;
    const condition = document.createElement("div");
    condition.innerHTML = weather.current.condition.text;
    const temp = document.createElement("div");
    temp.innerHTML = `${weather.current.temp_c}°C`;
    curr.appendChild(title);
    curr.appendChild(icon);
    curr.appendChild(condition);
    curr.appendChild(temp);
    page.appendChild(curr);
}

function renderForecast(forecast){
    const forecastSection = document.getElementById("main");
    for(let i=0; i<3; i++){
        const date = document.createElement('div');
        date.innerHTML = dayjs(forecast[i].date).format('ddd MMM D');
        const condition = document.createElement('div');
        condition.innerHTML = forecast[i].day.condition.text;
        const icon = document.createElement('img');
        icon.src = forecast[i].day.condition.icon;
        const temp = document.createElement('div');
        temp.innerHTML = `${Math.round(forecast[i].day.maxtemp_c)}°C / ${Math.round(forecast[i].day.mintemp_c)}°C`;
        console.log(forecast[i].day);

        const dayTile = document.createElement('div');
        dayTile.classList.add('dayTile');
        dayTile.appendChild(date);
        dayTile.appendChild(icon);
        dayTile.appendChild(condition);
        dayTile.appendChild(temp);
        forecastSection.appendChild(dayTile);
    }
}



