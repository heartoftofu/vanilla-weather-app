function displayToday(response) {
  console.log(Math.round(response.data.main.temp));
}

let apiKey = "bbd1db320ae920fe369bb8780e0dda6d";
let cityName = document.querySelector("input").value;
let units = "metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}`;

axios.get(apiUrl).then(displayToday);
