export function showNotification(message: string) {
  const div = document.createElement("div")
  div.className = "notification"
  div.textContent = message

  document.body.appendChild(div)

  setTimeout(() => div.remove(), 4000)
}
