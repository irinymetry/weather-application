function citySearch(event) {
  event.preventDefault();
  let cityValue = document.querySelector("#search-input");
  let city = document.querySelector("#current-city");
  city.innerHTML = cityValue.value;

  let apiKey = "f65a87fb0c6fa7cce995f31a5e35496e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue.value}&units=metric&appid=${apiKey}`;
    window.axios.get(apiUrl).then(showTemeperature);
    
}

function celsiusTemp(event) {
    event.preventDefault();
let currentdescription = document.querySelector("#temperature");
currentdescription.innerHTML = celsiusTemperature;
}
function getForecast(coordinates) {
  let apiKey = "f65a87fb0c6fa7cce995f31a5e35496e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  window.axios.get(apiUrl).then(displayForecast);
}
function showTemeperature(response) {
  //temperature in celsius
     celsiusTemperature = Math.round(response.data.main.temp);
  let newH1 = document.querySelector("#temperature");
    newH1.innerHTML = celsiusTemperature;
    
    //weather description
  let currentdescription = document.querySelector("#weather-description");
    currentdescription.innerHTML = response.data.weather[0].main;
    //humidity
    let humidity = document.querySelector("#humidity");
    humidity.innerHTML = `${response.data.main.humidity}`;
    //wind speed
    let wind = document.querySelector("#wind");
    wind.innerHTML = `${response.data.wind.speed}`;

    //weather icon
    let icon = document.querySelector("#icon");
    icon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
  
  
  getForecast(response.data.coord);
}

function showcurrentLocationTemp() {
  navigator.geolocation.getCurrentPosition(showPosition);
  let currentLocation = document.querySelector("#current-city");
  currentLocation.innerHTML = "Current Location";
  
}
function showPosition(position) {
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let apiKey = "f65a87fb0c6fa7cce995f31a5e35496e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  window.axios.get(apiUrl).then(showCurrentTemeperature);
}
function showCurrentTemeperature(response) {
    //temperature in celsius
   celsiusTemperature =response.data.main.temp;
  let h1 = document.querySelector("#temperature");
    h1.innerHTML = celsiusTemperature;
    //weather description
  let currentdescription = document.querySelector("#weather-description");
    currentdescription.innerHTML = `${response.data.weather[0].main}`;
    
 //humidity
    let humidity = document.querySelector("#humidity");
    humidity.innerHTML = `${response.data.main.humidity}`;
    //wind speed
    let wind = document.querySelector("#wind");
    wind.innerHTML = `${response.data.wind.speed}`;

    //weather icon
    let icon = document.querySelector("#icon");
    icon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
 
  getForecast(response.data.coord);
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDate();
  let days = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat"
];
  return days[day];
}
function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index<5){
    forecastHTML = forecastHTML + `
  
            <div class="col">
                <div class="shadow p-3 mb-5 bg-body rounded">
                    <h6>${formatDay(forecastDay.dt)}</h6>
                    <p>${Math.round(forecastDay.temp.day)}°C <img src=http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png
                    alt=""
                    width="42"/></p>
                </div>
            </div>`;
      }
    
  });
 
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
  
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
let realTime = new Date().toLocaleTimeString();
let currentDay = document.querySelector("#today");
let currrentTime = document.querySelector("#current-time");
currentDay.innerHTML = `${day}`;
currrentTime.innerHTML = `${realTime}`;

let newCity = document.querySelector(".search-field");
newCity.addEventListener("submit", citySearch);

let celsiusTemperature = null;
let celsiusValue = document.querySelector("#temperature");


let currentLocation = document.querySelector("#current-location-button");
currentLocation.addEventListener("click", showcurrentLocationTemp);
