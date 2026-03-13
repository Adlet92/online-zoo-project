import { getCameras, getFeedback, getPetById, getPets } from "./api/api"
import { zooMedia } from "./data/zooMedia"
import { createFeedbackCard } from "./render/createFeedbackCard"
import { createPetCard } from "./render/createPetCard"
import { createSidebarItem } from "./render/createSidebarItem"
import { renderPetDetails } from "./render/renderPetDetails"
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

function updateMainCamera(petId: number): void {
  const mainImage = document.querySelector(".live-main img")
  if (!mainImage) return
  const media = zooMedia[petId]
  if (media) {
    mainImage.setAttribute("src", media.main)
  }

}
function updateThumbnails(petId: number): void {

  const cams = document.querySelectorAll(".live-cams .cam img")

  const media = zooMedia[petId]

  if (!media) return

  cams.forEach((img, index) => {
    if (media.thumbnails[index]) {
      img.setAttribute("src", media.thumbnails[index])
    }
  })

}
function setActiveSidebar(petId: number): void {

  const items = document.querySelectorAll(".sidebar-item-decoration")

  items.forEach(item => {

    const id = Number((item as HTMLElement).dataset.petId)

    const animal = item.querySelector(".animal")

    if (id === petId) {
      item.classList.add("active")
      animal?.classList.add("active")
    } else {
      item.classList.remove("active")
      animal?.classList.remove("active")
    }

  })

}
async function loadPetDetails(petId: number): Promise<void> {

  try {

    const response = await getPetById(petId)

    renderPetDetails(response.data)

  } catch {

    const didText = document.getElementById("didText")

    if (didText) {
      didText.textContent =
        "Something went wrong. Please refresh the page"
    }

  }

}
function updateInfoImage(petId: number): void {

  const image = document.getElementById("infoImage") as HTMLImageElement | null

  if (!image) return

  const media = zooMedia[petId]

  if (media) {
    image.src = media.infoImage
  }

}

async function loadZooPage(): Promise<void> {

  const petId = getPetIdFromUrl()

  if (!petId) return

  await setLiveTitle()

  updateMainCamera(petId)
  updateThumbnails(petId)
  setActiveSidebar(petId)
  updateInfoImage(petId)
  loadPetDetails(petId)

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

    loadZooPage()

  } catch {

    container.innerHTML =
      `<div class="api-error">Something went wrong. Please refresh the page</div>`

  }
}

loadSidebar()

document.addEventListener("DOMContentLoaded", init)
