function takeCityName() {
  document
    .querySelector(".search button")
    .addEventListener("click", function () {
      let city = document.querySelector(".search input").value;
      checkWeather(city);
      document.querySelector(".search input").value = "";
    });
}

function takeCityNameAfterEnter() {
  document
    .querySelector(".search input")
    .addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        let city = document.querySelector(".search input").value;
        checkWeather(city);
        document.querySelector(".search input").value = "";
      }
    });
}

takeCityName();
takeCityNameAfterEnter();

async function checkWeather(city) {
  let response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=53ee2643bd407b926b25a6bf5507833c&units=metric`
  );

  if (response.status != 200) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    let data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temperature").innerHTML = `${Math.round(
      data.main.temp
    )}°c`;
    document.querySelector(".humidity").innerHTML = `${data.main.humidity}%`;
    document.querySelector(".wind").innerHTML = `${data.wind.speed} km/h`;

    if (data.weather[0].main === "Clouds") {
      document.querySelector(".weather-icon").src = "images/clouds.png";
    } else if (data.weather[0].main === "Clear") {
      document.querySelector(".weather-icon").src = "images/clear.png";
    } else if (data.weather[0].main === "Mist") {
      document.querySelector(".weather-icon").src = "images/mist.png";
    } else if (data.weather[0].main === "Rain") {
      document.querySelector(".weather-icon").src = "images/rain.png";
    } else if (data.weather[0].main === "Drizzle") {
      document.querySelector(".weather-icon").src = "images/drizzle.png";
    } else if (data.weather[0].main === "Snow") {
      document.querySelector(".weather-icon").src = "images/snow.png";
    }

    document.querySelector(".error").style.display = "none";
    document.querySelector(".weather").style.display = "block";
  }
}
