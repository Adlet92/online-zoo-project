import { getPets } from "../../api/api"
import { state } from "../donationState"
import { isValidAmount } from "../utils/validators"

export async function initStep1() {
  const amountButtons = document.querySelectorAll('.amount-buttons button')
  const otherInput = document.querySelector('.right-input') as HTMLInputElement
  const nextBtn = document.querySelector('.step-1 .next-btn') as HTMLButtonElement

  const selectDisplay = document.querySelector('.select-display') as HTMLElement
  const optionsContainer = document.querySelector('.select-options') as HTMLElement
  const displayText = selectDisplay?.querySelector('.placeholder') as HTMLElement

  if (!otherInput || !nextBtn || !selectDisplay || !optionsContainer) return

  nextBtn.disabled = true

  try {
    const response = await getPets()
    const pets = response.data

    optionsContainer.innerHTML = ""

    pets.forEach((pet: any) => {
      const option = document.createElement('div')
      option.className = 'option'
      option.textContent = pet.commonName

      option.addEventListener('click', () => {
        state.pet = {
          id: pet.id,
          name: pet.commonName
        }

        if (displayText) {
          displayText.textContent = pet.commonName
        }

        optionsContainer.classList.add('hidden')
        validate()
      })

      optionsContainer.appendChild(option)
    })

  } catch {
    optionsContainer.innerHTML =
      `<div class="option">Failed to load pets</div>`
  }

  selectDisplay.addEventListener('click', (e) => {
    e.stopPropagation()
    optionsContainer.classList.toggle('hidden')
  })

  document.addEventListener('click', (e) => {
    if (!selectDisplay.contains(e.target as Node)) {
      optionsContainer.classList.add('hidden')
    }
  })

  amountButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const value = btn.textContent?.replace('$', '')
      state.amount = Number(value)

      otherInput.value = ""
      validate()
    })
  })

  otherInput.addEventListener('input', () => {
    const value = otherInput.value
    state.amount = isValidAmount(value) ? Number(value) : null
    validate()
  })

  function validate() {
    nextBtn.disabled = !(state.amount && state.pet)
  }
}
