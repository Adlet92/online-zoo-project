import { cameraImages } from "../data/cameraImages"
import { Camera } from "../types/api"

export function createSidebarItem(camera: Camera): HTMLElement {

  const item = document.createElement("a")
  item.className = "sidebar-item-decoration"
  item.dataset.petId = String(camera.petId)
  // item.href = "#"

  const image = cameraImages[camera.petId]

  item.innerHTML = `
    <div class="sidebar-item">
      <div class="animal">
        <img src="${image}" />
      </div>
      <div class="animal-text">
        ${camera.text}
      </div>
    </div>
    <div class="sidebar-divider"></div>
  `

  return item
}
