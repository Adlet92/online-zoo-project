export function saveCard(card: any) {
  const cards = JSON.parse(localStorage.getItem("cards") || "[]")
  cards.push(card)
  localStorage.setItem("cards", JSON.stringify(cards))
}

export function getSavedCards() {
  return JSON.parse(localStorage.getItem("cards") || "[]")
}
