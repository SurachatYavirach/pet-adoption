async function start() {
  const weatherPromise = await fetch("https://api.weather.gov/gridpoints/MFL/112,52/forecast")
  const weatherData = await weatherPromise.json()
  const weatherTemperature = weatherData.properties.periods[0].temperature

  document.querySelector("#Temp-output").textContent = weatherTemperature
}

start()

