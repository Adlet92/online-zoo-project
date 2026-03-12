
// interface AuthPayload {
//   login: string;
//   password: string;
// }

// const loginInput = document.getElementById("loginInput") as HTMLInputElement;
// const passwordInput = document.getElementById("passwordInput") as HTMLInputElement;
// const signInBtn = document.getElementById("signInBtn") as HTMLButtonElement;
// const authError = document.getElementById("authError") as HTMLElement;
// const form = document.getElementById("signInForm") as HTMLFormElement;

// function validateLogin(value: string): boolean {
//   return /^[A-Za-z][A-Za-z]{2,}$/.test(value);
// }

// function validatePassword(value: string): boolean {
//   return value.length >= 6 && /[^a-zA-Z0-9]/.test(value);
// }

// function updateButtonState(): void {
//   const isValid =
//     validateLogin(loginInput.value) &&
//     validatePassword(passwordInput.value);

//   signInBtn.disabled = !isValid;
// }

// function showError(input: HTMLInputElement, message: string): void {
//   input.classList.add("error");

//   const sibling = input.nextElementSibling as HTMLElement | null;
//   if (sibling) sibling.textContent = message;
// }

// function clearError(input: HTMLInputElement): void {
//   input.classList.remove("error");

//   const sibling = input.nextElementSibling as HTMLElement | null;
//   if (sibling) sibling.textContent = "";

//   authError.classList.add("hidden");
// }

// loginInput.addEventListener("blur", () => {
//   if (!validateLogin(loginInput.value)) {
//     showError(loginInput, "Login must be ≥ 3 letters and start with a letter");
//   }
// });

// loginInput.addEventListener("focus", () => clearError(loginInput));
// loginInput.addEventListener("input", updateButtonState);

// passwordInput.addEventListener("blur", () => {
//   if (!validatePassword(passwordInput.value)) {
//     showError(passwordInput, "Password must be ≥ 6 chars & contain special symbol");
//   }
// });

// passwordInput.addEventListener("focus", () => clearError(passwordInput));
// passwordInput.addEventListener("input", updateButtonState);

// form.addEventListener("submit", async (e: Event) => {
//   e.preventDefault();

//   authError.classList.add("hidden");

//   const payload: AuthPayload = {
//     login: loginInput.value,
//     password: passwordInput.value
//   };

//   try {
//     const res = await fetch(
//       "https://6kt29kkeub.execute-api.eu-central-1.amazonaws.com/auth/login",
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload)
//       }
//     );

//     if (!res.ok) {
//       authError.classList.remove("hidden");
//       return;
//     }

//     localStorage.setItem("isLoggedIn", "true");
//     window.location.href = "../menu-page/menu.html";

//   } catch (err) {
//     authError.classList.remove("hidden");
//   }
// });

// document.addEventListener("DOMContentLoaded", () => {
//   const menuIcon = document.querySelector(".menu-with-icon-header");
//   const bagIcon = document.querySelector(".shopping-bag-icon");
//   if (menuIcon) {
//     menuIcon.addEventListener("click", () => {
//       window.location.href = "../menu-page/menu.html";
//     });
//   }
//   if (bagIcon) {
//     bagIcon.addEventListener("click", () => {
//       window.location.href = "../cart-page/cart.html";
//     });
//   }
// });
