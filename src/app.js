function sunriseTime(rise) {
  let date = new Date(rise);

  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `Sunrise: ${hours}:${minutes}h | `;
}

function sunsetTime(set) {
  let date = new Date(set);

  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `Sunset: ${hours}:${minutes}h`;
}

function localDateAndTime(unixTime) {
  let date = new Date(unixTime);

  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let dayOfTheWeek = weekdays[date.getDay()];
  let dayOfTheMonth = date.getDate();

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let currentMonth = months[date.getMonth()];

  return `${dayOfTheWeek}, ${dayOfTheMonth} of ${currentMonth} - ${hours}:${minutes}h`;
}

function displayToday(response) {
  let cityDisplayed = document.querySelector("#city");
  cityDisplayed.innerHTML = response.data.name;

  let dateAndTime = document.querySelector("#date-and-time");
  dateAndTime.innerHTML = localDateAndTime(1000 * response.data.dt);

  let currentIcon = document.querySelector("#current-icon");
  currentIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  currentIcon.setAttribute("alt", response.data.weather[0].description);

  let temperatureToday = document.querySelector("#temperature-today");
  temperatureToday.innerHTML = Math.round(response.data.main.temp);

  let weatherCondition = document.querySelector("#condition-txt");
  weatherCondition.innerHTML = response.data.weather[0].description;

  let highToday = document.querySelector("#high");
  highToday.innerHTML = `High: ${Math.round(response.data.main.temp_max)}ºC | `;

  let lowToday = document.querySelector("#low");
  lowToday.innerHTML = `Low: ${Math.round(response.data.main.temp_min)}ºC`;

  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = `Wind speed: ${Math.round(
    "3.6" * response.data.wind.speed
  )}km/h`;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;

  let sunrise = document.querySelector("#sunrise");
  sunrise.innerHTML = sunriseTime(1000 * response.data.sys.sunrise);

  let sunset = document.querySelector("#sunset");
  sunset.innerHTML = sunsetTime(1000 * response.data.sys.sunset);

  celsiusTemperature = Math.round(response.data.main.temp);
  kilometersHour = Math.round("3.6" * response.data.wind.speed);
  highCelsius = Math.round(response.data.main.temp_max);
  lowCelsius = Math.round(response.data.main.temp_min);

  console.log(response.data);
}

function searchCity(cityName) {
  let apiKey = "bbd1db320ae920fe369bb8780e0dda6d";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayToday);
}

function submitInfo(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  searchCity(cityInput.value);
}

function displayImperial(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;

  let temperatureToday = document.querySelector("#temperature-today");
  temperatureToday.innerHTML = Math.round(fahrenheitTemperature);

  let degreesFarenheit = document.querySelector("#degrees");
  degreesFarenheit.innerHTML = `ºF`;

  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = `Wind speed: ${Math.round(kilometersHour / 1.609)}mph`;

  let highFarenheit = document.querySelector("#high");
  highFarenheit.innerHTML = `High: ${Math.round(
    (highCelsius * 9) / 5 + 32
  )}ºF | `;

  let lowFahrenheit = document.querySelector("#low");
  lowFahrenheit.innerHTML = `Low: ${Math.round((lowCelsius * 9) / 5 + 32)}ºF`;

  selectMetric.classList.remove("active");
  selectImperial.classList.add("active");
}
function displayMetric(event) {
  event.preventDefault();

  let temperatureToday = document.querySelector("#temperature-today");
  temperatureToday.innerHTML = celsiusTemperature;

  let degreesCelsius = document.querySelector("#degrees");
  degreesCelsius.innerHTML = `ºC`;

  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = `Wind speed: ${kilometersHour}km/h`;

  let highCelsiusDisplay = document.querySelector("#high");
  highCelsiusDisplay.innerHTML = `High: ${Math.round(highCelsius)}ºC | `;

  let lowCelsiusDisplay = document.querySelector("#low");
  lowCelsiusDisplay.innerHTML = `High: ${Math.round(lowCelsius)}ºC`;

  selectMetric.classList.add("active");
  selectImperial.classList.remove("active");
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", submitInfo);

let celsiusTemperature = null;
let kilometersHour = null;
let highCelsius = null;
let lowCelsius = null;

let selectImperial = document.querySelector("#imperial");
selectImperial.addEventListener("click", displayImperial);

let selectMetric = document.querySelector("#metric");
selectMetric.addEventListener("click", displayMetric);

searchCity("Madrid");
