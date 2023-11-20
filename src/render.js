import { createElement, getElement } from "./helpers";
import { fetchWeatherData } from "./model-data";
import { renderFooter } from "./footer";
export { renderFactory };

function renderFactory() {
  const defaultCity = "Honolulu";
  const header = createElement("header");
  document.body.appendChild(header);
  const section1 = createElement("section", "section1");
  document.body.appendChild(section1);
  const section2 = createElement("section", "section2");
  document.body.appendChild(section2);
  const section3 = createElement("section", "section3");
  document.body.appendChild(section3);

  window.onload = function () {
    fetchWeatherData(defaultCity)
      .then((weatherData) => renderWeatherData(weatherData, section1))
      .catch((error) => {
        console.error("Error fetching weather data for default city", error);
      });
  };

  function renderPage() {
    const headerContent = `<h1>Current Weather</h1><h2 class="time"></h2>`;
    header.innerHTML = headerContent;
    const formDiv = createElement("form", "formDiv");
    const formContent = `<form action="">
      <label for="city">Enter City or Zip Code:</label>
      <input type="text" name="city" id="city" />
      <button class="getData" type="submit">Get Current Weather</button>
    </form>`;
    formDiv.innerHTML = formContent;
    section2.appendChild(formDiv);

    const form = getElement("form");
    form.addEventListener("submit", handleFormSubmit);

    const divWeatherContainer = createElement("div", "locationContainer");
    const iconEl = createElement("p", "icon");
    const textBoxLocation = createElement("p", "location");
    const textBoxTemperature = createElement("p", "temperature");
    const textBoxCondition = createElement("p", "condition");
    const textBoxWindDir = createElement("p", "windDir");

    divWeatherContainer.appendChild(iconEl);
    divWeatherContainer.appendChild(textBoxLocation);
    divWeatherContainer.appendChild(textBoxCondition);
    divWeatherContainer.appendChild(textBoxTemperature);
    divWeatherContainer.appendChild(textBoxWindDir);
    section1.appendChild(divWeatherContainer);
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    const cityInput = getElement("#city");
    const city = cityInput.value.trim();
    if (!city) {
      return;
    }
    fetchWeatherData(city)
      .then((weatherData) => {
        if (weatherData.error) {
          alert("City not found, please check spelling or try another city");
        } else {
          renderWeatherData(weatherData, section1);
          cityInput.value = "";
        }
      })
      .catch((error) => console.error("Problem fetching the data", error));
  }

  function renderWeatherData(weatherData) {
    const { location, current } = weatherData; // extracts the location and current objects
    // extract the specific data
    const _city = location.name;
    const _state = location.region;
    const _tempf = current.temp_f;
    const _condition = current.condition.text;
    const _icon = current.condition.icon;
    const _windDir = current.wind_dir;
    const _windSpeed = current.wind_mph;
    const _time = location.localtime;
    const formattedTime = new Date(_time).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    const timeEl = getElement(".time");
    const iconEl = getElement(".icon");
    const textBoxLocation = getElement(".location");
    const textBoxTemperature = getElement(".temperature");
    const textBoxCondition = getElement(".condition");
    const textBoxWindDir = getElement("p.windDir");

    timeEl.textContent = `${formattedTime}`;
    textBoxLocation.textContent = `Location: ${_city}, ${_state}`;
    iconEl.innerHTML = `<img src=${_icon}>`;
    textBoxCondition.textContent = `Condition: ${_condition}`;
    textBoxTemperature.textContent = `Temperature: ${Math.round(_tempf)}°F`;
    textBoxWindDir.textContent = `Wind: ${Math.round(
      _windSpeed
    )} mph from ${_windDir}`;
  }

  function renderCredits() {
    const creditDiv = createElement("div", "creditDiv");
    const paragraph = createElement("p");
    paragraph.textContent = "Powered by ";

    const weatherApiLink = createElement("a");
    weatherApiLink.href = "https://www.weatherapi.com/";
    weatherApiLink.title = "Free Weather API";
    weatherApiLink.textContent = " WeatherAPI.com";

    creditDiv.appendChild(paragraph);
    creditDiv.appendChild(weatherApiLink);
    section3.appendChild(creditDiv);
    renderFooter();
  }
  return {
    renderPage,
    renderCredits,
  };
}
