import { renderPage } from "./render";
export { fetchWeatherData };
// export { processHeader };


async function fetchWeatherData(city) {
  const weatherAPIKey = process.env.WEATHER_API_KEY;
  const apiURL = `http://api.weatherapi.com/v1/current.json?key=${weatherAPIKey}&q=${city}&aqi=no`;

  try {
    const response = await fetch(apiURL, {
      mode: "cors",
      method: "get",
      headers: {},
    }); // promise to get data
    if (!response.ok) {
      throw new Error("network reponse not ok");
    }

    const data = await response.json(); // process received data
    console.log(data);
    return data;
  } catch (error) {
    console.error("problem fetching data", error);
  }
}
