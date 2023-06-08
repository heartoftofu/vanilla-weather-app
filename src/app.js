function displayToday(response) {
  let cityDisplayed = document.querySelector("#city");
  cityDisplayed.innerHTML = response.data.name;

  //date and time goes here

  let temperatureToday = document.querySelector("#temperature-today");
  temperatureToday.innerHTML = Math.round(response.data.main.temp);

  let weatherCondition = document.querySelector("#condition-txt");
  weatherCondition.innerHTML = response.data.weather[0].description;

  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = `Wind speed: ${Math.round(
    "3.6" * response.data.wind.speed
  )}Km/h`;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;

  //let sunrise = document.querySelector("#sunrise");
  //let sunset = document.querySelector("sunset");

  console.log(response.data);
}

let apiKey = "bbd1db320ae920fe369bb8780e0dda6d";
let cityName = "Toledo";
let units = "metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}`;

axios.get(apiUrl).then(displayToday);

/*LEAVING TIME AND DATE FOR LATER. FIX TIME AND DATE FORMATS AND FIGURE LOOPS OUT FOR WEEKDAYS

function localDateAndTime() {
  let weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let dateAndTime = document.querySelector("#date-and-time");
  dateAndTime.innerHTML = new Date(1000 * response.data.dt);
}
*/
