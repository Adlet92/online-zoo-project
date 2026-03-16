import { getCameras, getFeedback, getPetById, getPets } from "./api/api"
import { initRegister } from "./auth/register"
import { initSignIn } from "./auth/signin"
import { initUserMenu } from "./auth/userMenu"
import { zooMedia } from "./data/zooMedia"
import { createFeedbackCard } from "./render/createFeedbackCard"
import { createPetCard } from "./render/createPetCard"
import { createSidebarItem } from "./render/createSidebarItem"
import { renderPetDetails } from "./render/renderPetDetails"
import { Slider } from "./slider/slider"

async function init(): Promise<void> {
  initSignIn()
  initRegister()
  initUserMenu()
  loadPets()
  loadFeedback()
  loadSidebar()
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

function setLiveTitle(petName: string): void {
  const title = document.querySelector(".live-title")

  if (!title) return

  title.textContent = "LIVE " + petName.toUpperCase() + " CAMS"
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

  const loader = document.getElementById("zooInfoLoader")
  const content = document.getElementById("zooInfoContent")
  const error = document.getElementById("zooInfoError")


  try {

    const response = await getPetById(petId)
    const pet = response.data

    renderPetDetails(pet)
    setLiveTitle(pet.commonName)
    loader?.classList.add("hidden")
    content?.classList.remove("hidden")

  } catch {

    loader?.classList.add("hidden")
    error?.classList.remove("hidden")

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

  const liveLayout = document.querySelector(".live-layout")
  const loader = liveLayout?.querySelector(".loader")
  loader?.classList.remove("hidden");
  try {
    updateMainCamera(petId)
    updateThumbnails(petId)
    setActiveSidebar(petId)
    updateInfoImage(petId)
    loader?.classList.add("hidden");
    loadPetDetails(petId)

  } catch {
    if (liveLayout) {
      liveLayout.innerHTML = `<div class="api-error">Something went wrong. Please refresh the page</div>`
    }
}


}

async function loadSidebar(): Promise<void> {
  const loader = document.getElementById("zooTopLoader")
  const content = document.getElementById("zooTopContent")
  const error = document.getElementById("zooTopError")

  try {

    const response = await getCameras()

    const container = document.getElementById("sidebarList")
    if (!container) return

    response.data.forEach(camera => {
      const element = createSidebarItem(camera)
      container.appendChild(element)
    })
    loader?.classList.add("hidden")
    content?.classList.remove("hidden")
    loadZooPage()

  } catch {

    loader?.classList.add("hidden")
    content?.classList.remove("hidden")

  }
}

loadSidebar()

document.addEventListener("DOMContentLoaded", init)
