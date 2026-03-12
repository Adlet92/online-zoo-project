import { Feedback } from "../types/api"

export function createFeedbackCard(feedback: Feedback): HTMLElement {
  const card = document.createElement("div")
  card.className = "testimonial-card"

  card.innerHTML = `
      <div class="card-meta">
        <div class="quote-sign"><span>“</span></div>
        <span class="location">${feedback.city}, ${feedback.month} ${feedback.year}</span>
      </div>

      <div class="feedback-text">
        ${feedback.text}
      </div>

      <div class="client-name">
        ${feedback.name}
      </div>
    `

  return card
}
