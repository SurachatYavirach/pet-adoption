const template = document.querySelector("#pet-card-template")
const wrapper = document.createDocumentFragment()

async function start() {
  const weatherPromise = await fetch("https://api.weather.gov/gridpoints/MFL/112,52/forecast")
  const weatherData = await weatherPromise.json()
  const weatherTemperature = weatherData.properties.periods[0].temperature

  document.querySelector("#Temp-output").textContent = weatherTemperature
}

start()

async function petsArea() {
  const petsPromise = await fetch("https://learnwebcode.github.io/bootcamp-pet-data/pets.json")
  const petsData = await petsPromise.json()
  petsData.forEach(pet => {
    const clone = template.content.cloneNode(true)

    clone.querySelector("h3").textContent = pet.name
    clone.querySelector(".pet-description").textContent = pet.description
    clone.querySelector(".pet-age").textContent = createAgeText(pet.birthYear)

    if (!pet.photo) pet.photo = "image/fallback.jpg"

    clone.querySelector(".pet-card-photo img").src = pet.photo
    clone.querySelector(".pet-card-photo img").alt = `A ${pet.species} named ${pet.name}`

    wrapper.appendChild(clone)
  })
  document.querySelector(".list-of-pets").appendChild(wrapper)
}

petsArea()

function createAgeText(birthYear) {
  const currentYear = new Date().getFullYear()
  const petAge = currentYear - birthYear

  if (petAge == 1) return "1 year old"
  if (petAge == 0) return "Less than year old"
  return `${petAge} years old`
}

// pet filter button code
const allbuttons = document.querySelectorAll(".pet-filter button")

allbuttons.forEach(el => {
  el.addEventListener("click", handleButtonClick)
})

function handleButtonClick(e) {
  // remove active class from any and all button
  allbuttons.forEach(el => el.classList.remove("active"))

  // add active class to the specifice button that just got click
  e.target.classList.add("active")

  // actually filter the pets down below

}

