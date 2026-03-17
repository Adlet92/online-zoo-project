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
    // if (index === 0) initStep1()
    // if (index === 1) initStep2()
    // if (index === 2) initStep3()
  }
  initStep1()

  // nextBtns.forEach(btn => {
  //   btn.addEventListener('click', () => {
  //     if (currentStep < steps.length - 1) {
  //       showStep(currentStep + 1)
  //     }
  //   })
  // })
  nextBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (currentStep < steps.length - 1) {
        // Before moving to next step, ensure current step's data is saved
        if (currentStep === 1) {
          // Double-check step 2 data before proceeding
          const nameInput = document.querySelector('.name-input') as HTMLInputElement
          const emailInput = document.querySelector('.email-input') as HTMLInputElement

          if (nameInput && emailInput) {
            state.name = nameInput.value.trim()
            state.email = emailInput.value.trim()
          }
        }

        showStep(currentStep + 1)

        // Initialize the next step
        if (currentStep === 1) initStep2()
        if (currentStep === 2) initStep3()
      }
    })
  })


  // backBtns.forEach(btn => {
  //   btn.addEventListener('click', () => {
  //     if (currentStep > 0) {
  //       showStep(currentStep - 1)
  //     }
  //   })
  // })
  backBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (currentStep > 0) {
        showStep(currentStep - 1)

        // Re-initialize the step when going back
        if (currentStep === 0) initStep1()
        if (currentStep === 1) initStep2()
      }
    })
  })
}
