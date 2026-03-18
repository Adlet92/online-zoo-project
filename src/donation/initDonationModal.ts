import { state } from "./donationState"
import { initStep1 } from "./steps/step1"
import { initStep2 } from "./steps/step2"
import { initStep3 } from "./steps/step3"

export function initDonationModal() {
  const overlay = document.getElementById("donationOverlaySteps")
  const feedBtns = document.querySelectorAll('.feed-btn')

  const steps = document.querySelectorAll('.donation-step')

  const nextBtns = document.querySelectorAll('.next-btn')
  const backBtns = document.querySelectorAll('.back-btn')

  if (!overlay || !steps.length) return

  let currentStep = 0

  feedBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      overlay.classList.add('active')
      document.body.classList.add('modal-open')

      showStep(0)
    })
  })

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.classList.remove('active')
      document.body.classList.remove('modal-open')
    }
  })

  function showStep(index: number) {
    steps.forEach(step => step.classList.remove('active'))
    steps[index].classList.add('active')

    currentStep = index
  }
  initStep1()

  nextBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (currentStep < steps.length - 1) {
        if (currentStep === 1) {
          const nameInput = document.querySelector('.name-input') as HTMLInputElement
          const emailInput = document.querySelector('.email-input') as HTMLInputElement

          if (nameInput && emailInput) {
            state.name = nameInput.value.trim()
            state.email = emailInput.value.trim()
          }
        }

        showStep(currentStep + 1)
        if (currentStep === 1) initStep2()
        if (currentStep === 2) initStep3()
      }
    })
  })

  backBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (currentStep > 0) {
        showStep(currentStep - 1)
        if (currentStep === 0) initStep1()
        if (currentStep === 1) initStep2()
      }
    })
  })
}
