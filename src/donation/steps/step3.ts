import { state } from "../donationState"
import { saveCard } from "../utils/storage"
import { isValidCardNumber, isValidCVV } from "../utils/validators"

const BASE_URL = "https://vsqsnqnxkh.execute-api.eu-central-1.amazonaws.com/prod"

export function initStep3() {
  const cardInput = document.querySelector('.card-input') as HTMLInputElement
  const cvvInput = document.querySelector('.cvv-input') as HTMLInputElement
  const completeBtn = document.querySelector('.next-btn-step-3') as HTMLButtonElement

  const monthDisplay = document.querySelector('.select-display.month') as HTMLElement
  const yearDisplay = document.querySelector('.select-display.year') as HTMLElement

  if (!cardInput || !cvvInput || !completeBtn || !monthDisplay || !yearDisplay) return

  completeBtn.disabled = true

  let selectedMonth = ""
  let selectedYear = ""

  cardInput.addEventListener('input', () => {
    const value = cardInput.value.replace(/\D/g, '')
    cardInput.value = value

    state.cardNumber = isValidCardNumber(value) ? value : ""

    validateStep3()
  })

  cvvInput.addEventListener('input', () => {
    const value = cvvInput.value.replace(/\D/g, '')
    cvvInput.value = value

    state.cvv = isValidCVV(value) ? value : ""

    validateStep3()
  })

  function createDropdown(
    display: HTMLElement,
    values: string[],
    onSelect: (val: string) => void
  ) {
    const list = document.createElement('div')
    list.className = 'select-options hidden'

    values.forEach(val => {
      const option = document.createElement('div')
      option.className = 'option'
      option.textContent = val

      option.addEventListener('click', () => {
        const span = display.querySelector('span')
        if (span) span.textContent = val

        list.classList.add('hidden')
        display.classList.add('selected')

        onSelect(val)
      })

      list.appendChild(option)
    })

    display.appendChild(list)

    display.addEventListener('click', (e) => {
      e.stopPropagation()
      list.classList.toggle('hidden')
    })

    document.addEventListener('click', (e) => {
      if (!display.contains(e.target as Node)) {
        list.classList.add('hidden')
      }
    })
  }

  const months = Array.from({ length: 12 }, (_, i) =>
    String(i + 1).padStart(2, '0')
  )

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 10 }, (_, i) =>
    String(currentYear + i).slice(-2)
  )

  createDropdown(monthDisplay, months, (val) => {
    selectedMonth = val
    validateExpiry()
  })

  createDropdown(yearDisplay, years, (val) => {
    selectedYear = val
    validateExpiry()
  })

  function validateExpiry() {
    if (!selectedMonth || !selectedYear) {
      state.expiry = ""
      validateStep3()
      return
    }

    const expDate = new Date(
      2000 + Number(selectedYear),
      Number(selectedMonth)
    )

    if (expDate > new Date()) {
      state.expiry = `${selectedMonth}/${selectedYear}`
    } else {
      state.expiry = ""
    }

    validateStep3()
  }

  function validateStep3() {
    completeBtn.disabled = !(
      state.cardNumber &&
      state.cvv &&
      state.expiry
    )
  }

  completeBtn.addEventListener('click', async () => {

     const payload = {
      amount: state.amount,
      petId: state.pet?.id,
      isMonthly: state.isMonthly,
      name: state.name,
      email: state.email,
      cardNumber: state.cardNumber,
      expiry: state.expiry,
      cvv: state.cvv,
      saveCard: state.saveCard
     }

    console.log("Submitting donation:", payload)

    try {
      const response = await fetch(`${BASE_URL}/donations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      const data = await response.json().catch(() => null)
      console.log("Response status:", response.status)
      console.log("Response data:", data)

    // ❗ handle API error message
      if (!response.ok) {
          throw new Error(
            data?.error ||
            data?.message ||
            `Server error (${response.status})`
          )
        }

      // if (!response.ok) throw new Error()

      if (state.saveCard) {
        saveCard({
          cardNumber: state.cardNumber,
          expiry: state.expiry,
          cvv: state.cvv
        })
      }

      // showNotification(
      //   `Thank you for your donation of $${state.amount} to ${state.pet}!`
      // )
      showSuccess(
        data?.data?.message ||
        `Thank you for your donation of $${state.amount} to ${state.pet?.name}!`
      )

    } catch {
      showSuccess(
        "Something went wrong. Please, try again later."
      )
    }
  })
}

function showSuccess(message: string) {
  const step3 = document.querySelector('.donation-step.step-3') as HTMLElement
  const body = step3?.querySelector('.donation-body') as HTMLElement

  if (!step3 || !body) return

  body.innerHTML = `
    <div class="success-container">
      <div class="success-content">
        <h3>Thank You!</h3>
        <p class="success-message">${message}</p>

        <button class="close-btn">Close</button>
      </div>
    </div>
  `

  const closeBtn = body.querySelector('.close-btn') as HTMLButtonElement

  closeBtn.onclick = () => {
    closeDonationModal()
  }

  // auto-close after 3 seconds
  setTimeout(() => {
    closeDonationModal()
  }, 3000)
}
function closeDonationModal() {
  const modal = document.querySelector('.donation-modal') as HTMLElement
  if (modal) {
    modal.classList.add('hidden')
  }
}
