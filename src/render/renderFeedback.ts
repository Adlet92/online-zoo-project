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
        <span class="location">${feedback.location}, ${feedback.date}</span>
      </div>

      <div class="feedback-text">
        ${feedback.message}
      </div>

      <div class="client-name">
        ${feedback.name}
      </div>
    `

    container.appendChild(card)
  })
}
