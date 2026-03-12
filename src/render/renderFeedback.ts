import { Feedback } from "../types/api"

export function renderFeedback(feedbacks: Feedback[]): void {
  const container = document.getElementById("testimonialsContainer")

  if (!container) return

  container.innerHTML = ""

  feedbacks.forEach((feedback: Feedback) => {
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

    container.appendChild(card)
  })
}
