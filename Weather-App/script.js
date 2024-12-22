const container = document.querySelector(".container");
const searchbox = document.querySelector(".searchbox button");
const weather = document.querySelector(".weather-box");
const details = document.querySelector(".weather-details");
const error = document.querySelector(".not-found");

const searchWeather = () => {
  const APIkey = "409676fb3d2ab10bd97a540e8b5f578a";
  const city = document.querySelector(".searchbox input").value.trim(); 

  if (city === "") return;

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`)
    .then(response => response.json())
    .then(json => {
      if (json.cod === "404") {
        container.style.height = "400px";
        weather.classList.remove("active");
        details.classList.remove("active");
        error.classList.add("active");
        return;
      }

      container.style.height = "500px";
      weather.classList.add("active");
      details.classList.add("active");
      error.classList.remove("active");

      const images = document.querySelector(".weather-box img");
      const temperature = document.querySelector(".weather-box .temperature");
      const description = document.querySelector(".weather-box .description");
      const humidity = document.querySelector(".weather-details .humidity span");
      const wind = document.querySelector(".weather-details .wind span");

      switch (json.weather[0].main) {
        case "Clear":
          images.src = "images/sun.png";
          break;
        case "Clouds":
          images.src = "images/cloud.png";
          break;
        case "Rain":
          images.src = "images/rainy.png";
          break;
        case "Snow":
          images.src = "images/snowflake.png";
          break;
        case "Thunderstorm":
          images.src = "images/thunderstorm.png";
          break;
        case "Mist":
        case "Haze":
          images.src = "images/fog.png";
          break;
        default:
          images.src = "images/cloudy-day.png";
      }

      temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)} Km/h`;
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
      container.style.height = "400px";
      weather.classList.remove("active");
      details.classList.remove("active");
      error.classList.add("active");
    });
};
searchbox.addEventListener("click", searchWeather);
document.querySelector(".searchbox input").addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    searchWeather();
  }
});


