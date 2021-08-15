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
  let celsiusNew;
  celsiusValue.innerHTML = celsiusNew;
}
function showTemeperature(response) {
  console.log(response.data.main.temp);
  let newH1 = document.querySelector("#temperature");
  newH1.innerHTML = `${response.data.main.temp}`;
  let currentdescription = document.querySelector("#weather-description");
  currentdescription.innerHTML = `${response.data.weather[0].main}`;
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
  console.log(response.data.main.temp);
  let h1 = document.querySelector("#temperature");
  h1.innerHTML = `${response.data.main.temp}`;
  let currentdescription = document.querySelector("#weather-description");
  currentdescription.innerHTML = `${response.data.weather[0].main}`;
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

let celsiusValue = document.querySelector("#temperature");

let celsius = document.querySelector("#celsius");

celsius.addEventListener("click", celsiusTemp);
let currentLocation = document.querySelector("#current-location-button");
currentLocation.addEventListener("click", showcurrentLocationTemp);
