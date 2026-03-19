import { getUser } from "../../auth/auth"
import { state } from "../donationState"
import { isValidEmail } from "../utils/validators"

export async function initStep2() {
  const nameInput = document.querySelector('.name-input') as HTMLInputElement
  const emailInput = document.querySelector('.email-input') as HTMLInputElement
  const nextBtn = document.querySelector('.step-2 .next-btn') as HTMLButtonElement

  if (!nameInput || !emailInput || !nextBtn) {
    console.error('Step 2 elements not found in DOM!');
    return;
  }

  nextBtn.disabled = true

  if (state.name) nameInput.value = state.name
  if (state.email) emailInput.value = state.email

  function validateStep2() {
    const name = nameInput.value.trim()
    const email = emailInput.value.trim()
    const isValid = name.length > 0 && isValidEmail(email)

    nextBtn.disabled = !isValid

    if (isValid) {
      state.name = name
      state.email = email
    }
  }

  nameInput.addEventListener('input', validateStep2)
  emailInput.addEventListener('input', validateStep2)

  nameInput.addEventListener('blur', () => {
    state.name = nameInput.value.trim()
  })

  emailInput.addEventListener('blur', () => {
    state.email = emailInput.value.trim()
  })

  try {
    const user = await getUser()
    if (user) {
      nameInput.value = user.name || ""
      emailInput.value = user.email || ""

      state.name = user.name || ""
      state.email = user.email || ""

      validateStep2()
    }
  } catch (error) {
    console.error('Failed to load user:', error)
  }

  validateStep2()
}
