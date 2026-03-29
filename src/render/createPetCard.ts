import { petImages } from "../data/petImages"
import { Pet } from "../types/api"

export function createPetCard(pet: Pet): HTMLElement {
  const card = document.createElement("div")
  card.className = "pet-card"

  const image = petImages[pet.id]

  card.innerHTML = `
    <div class="pet-img">
      <img src="${image}" alt="${pet.commonName}">
      <span class="pet-name">${pet.name}</span>
    </div>

    <div class="pet-info">
      <h4>${pet.commonName}</h4>
      <p>${pet.description}</p>
      <button class="btn-pets">
        <span class="btn-span">View Live Cam</span>
      </button>
    </div>
  `
  const button = card.querySelector(".btn-pets")

  button?.addEventListener("click", () => {
    window.location.href = `./pages/zoos/zoos.html?petId=${pet.id}`
  })

  return card
}
