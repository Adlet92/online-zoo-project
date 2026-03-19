import { PetDetails } from "../types/api"

export function renderPetDetails(pet: PetDetails): void {

  const didText = document.getElementById("didText")
  const commonName = document.getElementById("commonName")
  const scientificName = document.getElementById("scientificName")
  const type = document.getElementById("type")
  const size = document.getElementById("size")
  const diet = document.getElementById("diet")
  const habitat = document.getElementById("habitat")
  const range = document.getElementById("range")
  const detailedDescription = document.getElementById("detailedDescription")

  if (didText) didText.textContent = pet.description
  if (commonName) commonName.textContent = pet.commonName
  if (scientificName) scientificName.textContent = pet.scientificName
  if (type) type.textContent = pet.type
  if (size) size.textContent = pet.size
  if (diet) diet.textContent = pet.diet
  if (habitat) habitat.textContent = pet.habitat
  if (range) range.textContent = pet.range
  if (detailedDescription) detailedDescription.textContent = pet.detailedDescription

}
