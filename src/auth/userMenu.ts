import { getUser, logout } from "./auth"


export async function initUserMenu(): Promise<void> {

  const button = document.getElementById("userButton")
  const popup = document.getElementById("userPopup")
  const userName = document.getElementById("userName")

  if (!button || !popup) return

  const user = await getUser()

  if (user) {

    if (userName) {
      userName.textContent = user.name
    }

    popup.innerHTML = `
      <p><strong>${user.name}</strong></p>
      <p>${user.email}</p>
      <button id="logoutBtn">Sign Out</button>
    `

  } else {

    popup.innerHTML = `
      <a href="/pages/signin/signin.html">Sign In</a>
      <a href="/pages/register/register.html">Registration</a>
    `
  }

  button.addEventListener("click", () => {
    popup.classList.toggle("hidden-popup")
  })

  const logoutBtn = document.getElementById("logoutBtn")

  logoutBtn?.addEventListener("click", logout)
}
