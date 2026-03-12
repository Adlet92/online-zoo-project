import { getFeedback, getPets } from "./api/api"
import { createFeedbackCard } from "./render/createFeedbackCard"
import { createPetCard } from "./render/createPetCard"
import { Slider } from "./slider/slider"

async function init(): Promise<void> {
  loadPets()
  loadFeedback()
}

// async function loadPets(): Promise<void> {
//   const container = document.getElementById("petsContainer")

//   try {
//     const petsResponse = await getPets()
//     renderPets(petsResponse.data)
//   } catch (error) {
//     if (container) {
//       container.innerHTML = `
//         <div class="api-error">
//           Something went wrong. Please, refresh the page
//         </div>
//       `
//     }
//   }
// }
async function loadPets(): Promise<void> {
  const container = document.getElementById("petsContainer")

  if (!container) return

  try {
    const petsResponse = await getPets()

    const slider = new Slider(
      petsResponse.data,
      container,
      createPetCard,
      3
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

// async function loadFeedback(): Promise<void> {
//   const container = document.getElementById("testimonialsContainer")

//   try {
//     const feedbackResponse = await getFeedback()
//     renderFeedback(feedbackResponse.data)
//   } catch (error) {
//     if (container) {
//       container.innerHTML = `
//         <div class="api-error">
//           Something went wrong. Please, refresh the page
//         </div>
//       `
//     }
//   }
// }
async function loadFeedback(): Promise<void> {
  const container = document.getElementById("testimonialsContainer")

  if (!container) return

  try {
    const feedbackResponse = await getFeedback()

    const slider = new Slider(
      feedbackResponse.data,
      container,
      createFeedbackCard,
      2
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

document.addEventListener("DOMContentLoaded", init)
