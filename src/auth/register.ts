import {
  validateConfirmPassword,
  validateEmail,
  validateLogin,
  validateName,
  validatePassword
} from "./validation"

import { registerUser } from "./auth"

export function initRegister(): void {

  const form = document.getElementById("registerForm") as HTMLFormElement
  const button = document.getElementById("registerButton") as HTMLButtonElement
  const apiError = document.getElementById("registerError")

  if (!form) return

  const login = document.getElementById("login") as HTMLInputElement
  const name = document.getElementById("name") as HTMLInputElement
  const email = document.getElementById("email") as HTMLInputElement
  const password = document.getElementById("password") as HTMLInputElement
  const confirmPassword = document.getElementById("confirmPassword") as HTMLInputElement

  const inputs = [login, name, email, password, confirmPassword]

  function showError(input: HTMLInputElement, message: string) {

    const error = input.nextElementSibling as HTMLElement

    input.classList.add("error")
    error.textContent = message
  }

  function clearError(input: HTMLInputElement) {

    const error = input.nextElementSibling as HTMLElement

    input.classList.remove("error")
    error.textContent = ""
  }

  function checkForm(): boolean {

    const errors = [
      validateLogin(login.value),
      validateName(name.value),
      validateEmail(email.value),
      validatePassword(password.value),
      validateConfirmPassword(password.value, confirmPassword.value)
    ]

    const valid = errors.every(error => error === null)

    button.disabled = !valid

    return valid
  }

  login.addEventListener("blur", () => {
    const error = validateLogin(login.value)
    error ? showError(login, error) : clearError(login)
    checkForm()
  })

  name.addEventListener("blur", () => {
    const error = validateName(name.value)
    error ? showError(name, error) : clearError(name)
    checkForm()
  })

  email.addEventListener("blur", () => {
    const error = validateEmail(email.value)
    error ? showError(email, error) : clearError(email)
    checkForm()
  })

  password.addEventListener("blur", () => {
    const error = validatePassword(password.value)
    error ? showError(password, error) : clearError(password)
    checkForm()
  })

  confirmPassword.addEventListener("blur", () => {
    const error = validateConfirmPassword(password.value, confirmPassword.value)
    error ? showError(confirmPassword, error) : clearError(confirmPassword)
    checkForm()
  })

  inputs.forEach(input => {
  input.addEventListener("input", checkForm)
})

  form.addEventListener("submit", async (e) => {

    e.preventDefault()

    if (!checkForm()) return

    try {

      await registerUser({
        login: login.value,
        password: password.value,
        name: name.value,
        email: email.value
      })

      window.location.href = "./pages/signin/signin.html"

    } catch (error) {

      if (apiError)
        apiError.textContent = (error as Error).message
    }

  })

}
