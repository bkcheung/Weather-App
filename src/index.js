import "./style.css"
const dayjs = require('dayjs')

searchInit();
getWeather();

async function getWeather(location){
    try{
        clear();
        if(location===undefined){
            location = "Toronto";
        }
        const response = await fetch(`http://api.weatherapi.com/v1/forecast.json
                                      ?key=a5a72b44830a4c4d99e135309241502&q=
                                      ${location}&days=3&aqi=yes&alerts=yes`);
        const weather = await response.json();
        renderCurrent(weather);
        renderForecast(weather.forecast.forecastday);
    } catch(err){
        console.log(`Error: ${err}`);
    }
}

function searchInit(){
    const search = document.getElementById("search");
    search.addEventListener('keyup', (e)=>{
        if(e.key==="Enter"){
            getWeather(e.target.value);
        }
    })
}

function renderCurrent(weather){
    const location = document.getElementById("location");
    location.innerHTML = weather.location.name;

    const icon = document.getElementById("icon");
    icon.src = weather.current.condition.icon;
    const condition = document.getElementById("condition");
    condition.innerHTML = weather.current.condition.text;
    const temp = document.getElementById("temp");
    temp.innerHTML = `${weather.current.temp_c}°C`;
}

function renderForecast(forecast){
    const forecastSection = document.getElementById("weather");
    for(let i=0; i<3; i++){
        const date = document.createElement('div');
        date.innerHTML = dayjs(forecast[i].date).format('ddd MMM D');
        date.classList.add("title");
        const condition = document.createElement('div');
        condition.innerHTML = forecast[i].day.condition.text;
        const icon = document.createElement('img');
        icon.src = forecast[i].day.condition.icon;
        const temp = document.createElement('div');
        temp.innerHTML = `${Math.round(forecast[i].day.maxtemp_c)}°C / 
                          ${Math.round(forecast[i].day.mintemp_c)}°C`;

        const dayTile = document.createElement('div');
        dayTile.classList.add('dayTile');
        dayTile.appendChild(date);
        dayTile.appendChild(icon);
        dayTile.appendChild(condition);
        dayTile.appendChild(temp);
        forecastSection.appendChild(dayTile);
    }
}

function clear(){
    const weather = document.getElementById("weather");
    const rm = weather.querySelectorAll('div.dayTile');
    if(rm.length>0){
        for(let i=0; i<3; i++){
            rm[i].remove();
        }
    }
}