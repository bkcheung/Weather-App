import "./style.css"

getWeather();

async function getWeather(){
    try{
        const response = await fetch("http://api.weatherapi.com/v1/forecast.json?key=a5a72b44830a4c4d99e135309241502&q=Toronto&days=3&aqi=yes&alerts=yes");
        const weather = await response.json();
        renderLeft(weather);
        renderForecast(weather.forecast.forecastday);
    } catch(err){
        console.log(`Error: ${err}`);
    }
}

function renderLeft(weather){
    const location = document.getElementById("location");
    location.innerHTML = weather.location.name;
    const date = document.getElementById("date");
    date.innerHTML = weather.current.last_updated;
    const icon = document.getElementById("icon");
    icon.src = weather.current.condition.icon;
    const condition = document.getElementById("condition");
    condition.innerHTML = weather.current.condition.text;
    const temp = document.getElementById("temp");
    temp.innerHTML = `${weather.current.temp_c}℃`;
}

function renderForecast(forecast){
    const forecastSection = document.getElementById("forecast");
    for(let i=0; i<3; i++){
        const date = document.createElement('h3');
        date.innerHTML = forecast[i].date;
        const condition = forecast[i].day.condition.text;
        const icon = forecast[i].day.condition.icon;
        const high = forecast[i].day.maxtemp_c;
        const low = forecast[i].day.mintemp_c;
        console.log(date,condition,high,low);

        const dayTile = document.createElement('div');
        dayTile.classList.add('dayTile');
        dayTile.appendChild(date);
        forecastSection.appendChild(dayTile);
    }
}



