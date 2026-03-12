import { getFeedback, getPets } from "./api/api"
import { renderFeedback } from "./render/renderFeedback"
import { renderPets } from "./render/renderPets"

async function init(): Promise<void> {
  try {
    const petsResponse = await getPets()
    renderPets(petsResponse.data)

    const feedbackResponse = await getFeedback()
    renderFeedback(feedbackResponse.data)

  } catch (error) {
    console.error("Error loading data:", error)
  }
}

document.addEventListener("DOMContentLoaded", init)
