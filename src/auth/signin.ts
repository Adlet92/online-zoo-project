import { loginUser } from "./auth"
import { validateLogin, validatePassword } from "./validation"

export function initSignIn(): void {

  const form = document.getElementById("signinForm") as HTMLFormElement
  if (!form) return

  const login = document.getElementById("login") as HTMLInputElement
  const password = document.getElementById("password") as HTMLInputElement

  const button = document.getElementById("signinButton") as HTMLButtonElement
  const apiError = document.getElementById("signinError")

  const inputs = [login, password]

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
      validatePassword(password.value)
    ]

    const valid = errors.every(e => e === null)

    button.disabled = !valid

    return valid
  }

  login.addEventListener("blur", () => {

    const error = validateLogin(login.value)

    error ? showError(login, error) : clearError(login)

    checkForm()
  })

  password.addEventListener("blur", () => {

    const error = validatePassword(password.value)

    error ? showError(password, error) : clearError(password)

    checkForm()
  })

  inputs.forEach(input => {

    input.addEventListener("focus", () => clearError(input))

    input.addEventListener("input", checkForm)

  })

  form.addEventListener("submit", async (e) => {

    e.preventDefault()

    if (!checkForm()) return

    try {

      const response = await loginUser({
        login: login.value,
        password: password.value
      })

      window.location.href = "/index.html"

    } catch {

      if (apiError)
        apiError.textContent = "Incorrect login or password"
    }

  })

}
