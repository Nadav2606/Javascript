// fatch(url).then((response)=>response.json())

export async function fatchWeather(latitude, longitude) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,rain,apparent_temperature,visibility,wind_speed_10m`;
  const response = await fetch(url);
  const data = await response.jason();
  console.log(data);
  return data;
}

fetchWeatherfromApi(52.52, 13.41)
  .then((weather) => renderCountries(weather))
  .catch((error) => console.error(error));

function renderWeathers(weather) {
  const paramters = ["time", "rain", "apparent_temperature", "wind_speed_10m"];

  const times = weather.hourly.parameters[0]
    ? Object.values(weather.hourly.parameters).join(" | ")
    : "no hour can be showed at this time";

  console.log(times);
}
