import { createElement, getElement } from "./helpers";
import { fetchWeatherData } from "./model-data";
export { renderWeatherData };
export { handleFormSubmit };
export { renderPage };
export { renderCredits };

function renderPage() {
  const section1 = createElement("section", "section1");
  document.body.appendChild(section1);
  const formDiv = createElement("form", "formDiv");
  const formContent = `<form action="">
      <label for="zip">Enter City or Zip Code:</label>
      <input type="text" name="city" id="city" />
      <button class="getData" type="submit">Get Weather Data</button>
    </form>`;
  formDiv.innerHTML = formContent;
  section1.appendChild(formDiv);

  const form = getElement("form");
  form.addEventListener("submit", handleFormSubmit);
}

function handleFormSubmit(e) {
  e.preventDefault();
  const cityInput = getElement("#city");
  const city = cityInput.value.trim();
  fetchWeatherData(city)
    .then(renderWeatherData)
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
  // display data on page, create elements and then assign them
  const divWeatherContainer = createElement("div", "locationContainer");
  const iconEl = createElement("p", "icon");
  const textBoxLocation = createElement("p", "location");
  const textBoxTemperature = createElement("p", "temperature");
  const textBoxCondition = createElement("p", "condition");
  const textBoxWindDir = createElement("p", "windDir");

  textBoxLocation.textContent = `Location: ${_city}, ${_state}`;
  iconEl.innerHTML = `<img src=${_icon}>`;
  textBoxCondition.textContent = `Condition: ${_condition}`;
  textBoxTemperature.textContent = `Temperature: ${_tempf}°F`;
  textBoxWindDir.textContent = `Wind: ${_windSpeed}mph from ${_windDir}`;

  divWeatherContainer.appendChild(iconEl);
  divWeatherContainer.appendChild(textBoxLocation);
  divWeatherContainer.appendChild(textBoxCondition);
  divWeatherContainer.appendChild(textBoxTemperature);
  divWeatherContainer.appendChild(textBoxWindDir);
  document.body.appendChild(divWeatherContainer);
}

function renderCredits() {
  const section2 = createElement("section", "section2");
  document.body.appendChild(section2);

  const creditDiv = createElement("div", "creditDiv");
  const paragraph = createElement("p");
  paragraph.textContent = "Powered by";

  const weatherApiLink = createElement("a");
  weatherApiLink.href = "https://www.weatherapi.com/";
  weatherApiLink.title = "Free Weather API";
  weatherApiLink.textContent = "WeatherAPI.com";

  const weatherApiImg = createElement("img");
  weatherApiImg.src =
    "https://cdn.weatherapi.com/v4/images/weatherapi_logo.png";
  weatherApiImg.alt = "Weather data by WeatherAPI.com";
  weatherApiImg.border = "0";

  weatherApiLink.appendChild(weatherApiImg);
  creditDiv.appendChild(paragraph);
  creditDiv.appendChild(weatherApiLink);
  section2.appendChild(creditDiv);
}
