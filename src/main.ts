import { getFeedback, getPets } from "./api/api"
import { renderFeedback } from "./render/renderFeedback"
import { renderPets } from "./render/renderPets"

async function init(): Promise<void> {
  loadPets()
  loadFeedback()
}

async function loadPets(): Promise<void> {
  const container = document.getElementById("petsContainer")

  try {
    const petsResponse = await getPets()
    renderPets(petsResponse.data)
  } catch (error) {
    if (container) {
      container.innerHTML = `
        <div class="api-error">
          Something went wrong. Please, refresh the page
        </div>
      `
    }
  }
}

async function loadFeedback(): Promise<void> {
  const container = document.getElementById("testimonialsContainer")

  try {
    const feedbackResponse = await getFeedback()
    renderFeedback(feedbackResponse.data)
  } catch (error) {
    if (container) {
      container.innerHTML = `
        <div class="api-error">
          Something went wrong. Please, refresh the page
        </div>
      `
    }
  }
}

document.addEventListener("DOMContentLoaded", init)
