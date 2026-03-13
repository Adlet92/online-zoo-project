import { getCameras, getFeedback, getPets } from "./api/api"
import { createFeedbackCard } from "./render/createFeedbackCard"
import { createPetCard } from "./render/createPetCard"
import { createSidebarItem } from "./render/createSidebarItem"
import { Slider } from "./slider/slider"

async function init(): Promise<void> {
  loadPets()
  loadFeedback()
  loadSidebar()
  setLiveTitle()
}
async function loadPets(): Promise<void> {
  const container = document.getElementById("petsContainer")

  if (!container) return

  try {
    const petsResponse = await getPets()

    const slider = new Slider(
      petsResponse.data,
      container,
      createPetCard,
      8
    )

    const left = document.getElementById("petsLeft")
    const right = document.getElementById("petsRight")

    right?.addEventListener("click", () => slider.next())
    left?.addEventListener("click", () => slider.prev())

  } catch {
    container.innerHTML =
      `<div class="api-error">Something went wrong. Please, refresh the page</div>`
  }
}

async function loadFeedback(): Promise<void> {
  const container = document.getElementById("testimonialsContainer")

  if (!container) return

  try {
    const feedbackResponse = await getFeedback()

    const slider = new Slider(
      feedbackResponse.data,
      container,
      createFeedbackCard,
      4
    )

    const left = document.getElementById("feedbackLeft")
    const right = document.getElementById("feedbackRight")

    right?.addEventListener("click", () => slider.next())
    left?.addEventListener("click", () => slider.prev())

  } catch {
    container.innerHTML =
      `<div class="api-error">Something went wrong. Please, refresh the page</div>`
  }
}

function getPetIdFromUrl(): number | null {
  const params = new URLSearchParams(window.location.search)
  const petId = params.get("petId")

  if (!petId) return null

  return Number(petId)
}
async function setLiveTitle(): Promise<void> {
  const title = document.querySelector(".live-title")
  if (!title) return

  const petId = getPetIdFromUrl()
  if (!petId) return

  try {
    const response = await getPets()
    const pet = response.data.find(c => c.id === petId)
    if (pet) {
      title.textContent = "LIVE " + pet.commonName.toUpperCase() + " CAMS"
    }
  } catch {
    title.textContent = "Something went wrong. Please, refresh the page"
  }
}

async function loadSidebar(): Promise<void> {
  const container = document.getElementById("sidebarList")

  if (!container) return

  try {

    const response = await getCameras()

    container.innerHTML = ""

    response.data.forEach(camera => {
      const element = createSidebarItem(camera)
      container.appendChild(element)
    })

  } catch {

    container.innerHTML =
      `<div class="api-error">Something went wrong. Please refresh the page</div>`

  }
}

loadSidebar()

document.addEventListener("DOMContentLoaded", init)
