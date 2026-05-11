import Chart from "chart.js/auto";
import axios from "axios";

const form = document.getElementById("search-form");
const input = document.getElementById("city-input");
const status = document.getElementById("status");
const result = document.getElementById("result");
const chart = document.getElementById("chart");

const GEO_URL = "https://geocoding-api.open-meteo.com/v1/search";
const WEATHER_URL = "https://api.open-meteo.com/v1/forecast";

const weatherIcons = {
  0: "☀️", // Clear sky
  1: "🌤️", // Mainly clear
  2: "⛅", // Partly cloudy
  3: "☁️", // Overcast
  45: "🌫️", // Fog
  51: "🌦️", // Drizzle
  61: "🌧️", // Rain
  71: "🌨️", // Snow fall
  80: "🌦️", // Rain showers
  95: "⛈️", // Thunderstorm
};

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const city = input.value.trim();
  if (!city) return;

  status.textContent = "Our Satellite is on it";
  result.innerHTML = "";

  try {
    const geo = await axios.get(GEO_URL, {
      params: { name: city, count: 1, language: "en" },
    });
    if (!geo.data.results || geo.data.results.length === 0) {
      status.textContent = " Our Satellite could not pinpoint your request";
      return;
    }

    const { longitude, latitude, name, country } = geo.data.results[0];

    const weather = await axios.get(WEATHER_URL, {
      params: {
        longitude,
        latitude,
        hourly: "temperature_2m",
        forecast_days: 1,
        current: "temperature_2m,wind_speed_10m,weather_code",
      },
    });
    status.innerHTML = "";
    renderResult(name, country, weather.data);
    drewChart();
  } catch (error) {
    status.textContent = "Satellite malfuction try again later";
  }
});

function renderResult(name, country, data) {
  result.innerHTML = `
  <div class="card">
  <h2>${name},${country}</h2>
  <div class="temp">${data.current.temperature_2m},${data.current_units.temperature_2m}</div>
 <div class="temp">${data.current.wind_speed_10m},${data.current_units.wind_speed_10m}</div>


  </div>
  `;
}

function drewChart(hourly) {
  const labels = hourly.time;
  labels.forEach((label, index) => {
    labels[index] = label.slice(-5);
  });
  console.log(labels);
  const data = {
    labels: labels,
    datasets: [
      {
        axis: "x",
        label: "Hourly Dataset",
        data: hourly.temperature_2m,
        fill: false,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
    ],
  };
}

const chartGraph = new Chart(chart, {
  type: "line",
  data: data,
  options: {
    indexAxis: "x",
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});
