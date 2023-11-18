import {  createElement, getElement } from "./helpers.js";
import { renderWeather } from "./render.js";

const getZipDataBtn = getElement(".getWeather");
console.log(getZipDataBtn)
getZipDataBtn.addEventListener("submit", processWeatherData);

renderWeather();
console.log(renderWeather())

async function processWeatherData() {
  const response = await fetch(
    "http://api.weatherapi.com/v1/current.json?key='WEATHER_API_KEY'&q=96746&aqi=no",
    { mode: "cors", method: "get", headers: {} }
  )
    .then((response) => {
      return response.clone().json();
      console.log(response.json());
    })
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
}
