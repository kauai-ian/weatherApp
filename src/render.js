import { createElement, getElement } from "./helpers";
// import { processHeader } from "./model-data";
import { fetchWeatherData } from "./model-data";
export { renderWeather };
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
  form.addEventListener("submit", handleFormSubmit) ;
}

function handleFormSubmit(e) {
    e.preventDefault();
    const cityInput = getElement("#city");
    const city = cityInput.value.trim();
    fetchWeatherData(city)
    .then(renderWeatherData)
    .catch((error) => console.error("Problem fetching the data", error))
}

function renderWeatherData() {
  console.log("Weather data", weatherData)
  const div_location = createElement("div", "locationContainer");
  const icon = createElement("p", "icon");
  const textBox_location = createElement("p", "location");
  const textBox_weather = createElement("p", "weather");
  textBox_location.textContent = ${city};
  textBox_weather.textContent = "";

  div_location.appendChild(icon);
  div_location.appendChild(textBox_location);
  div_location.appendChild(textBox_weather);
  document.body.appendChild(div_location);
}

function renderCredits() {
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
  document.body.appendChild(creditDiv);
}
