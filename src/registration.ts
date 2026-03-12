

const login = document.querySelector<HTMLInputElement>("#login")!;
const password = document.querySelector<HTMLInputElement>("#password")!;
const confirmPassword = document.querySelector<HTMLInputElement>("#confirmPassword")!;
const city = document.querySelector<HTMLSelectElement>("#city")!;
const street = document.querySelector<HTMLSelectElement>("#street")!;
const house = document.querySelector<HTMLInputElement>("#house")!;
const registerBtn = document.querySelector<HTMLButtonElement>("#registerBtn")!;
const backendError = document.querySelector<HTMLParagraphElement>("#backendError")!;

const streetsByCity: Record<string, string[]> = {
  "New York": ["Wall St", "Broadway", "5th Ave", "Lexington", "Park", "Church", "Spring", "Madison", "Hudson", "Bond"],
  "Paris": ["Rivoli", "Saint Germain", "Montmartre", "Opera", "Louvre", "Bastille", "Temple", "Haussmann", "Rennes", "Trocadero"],
  "Tokyo": ["Shibuya", "Shinjuku", "Akiba", "Ginza", "Asakusa", "Roppongi", "Meguro", "Shinagawa", "Ueno", "Kanda"],
};

function validateLogin() {
  const value = login.value.trim();
  const valid = /^[A-Za-z]{3,}$/.test(value);
  return setValidation(login, valid, "Login must start with a letter and be ≥ 3 chars.");
}

function validatePassword() {
  const valid = /^(?=.*[^A-Za-z0-9]).{6,}$/.test(password.value);
  return setValidation(password, valid, "Min 6 chars + 1 special symbol");
}

function validateConfirm() {
  const valid = password.value === confirmPassword.value;
  return setValidation(confirmPassword, valid, "Passwords don't match");
}

function validateCity() {
  const valid = city.value !== "";
  return setValidation(city, valid, "Select a city");
}

function validateStreet() {
  const valid = street.value !== "";
  return setValidation(street, valid, "Select a street");
}

function validateHouse() {
  const houseNum = Number(house.value);
  const valid = houseNum > 1;
  return setValidation(house, valid, "Must be > 1");
}

function validatePayment() {
  const selected = document.querySelector<HTMLInputElement>("input[name='payment']:checked");
  const valid = Boolean(selected);
  const paymentBlock = document.querySelector(".payment-block small")!;
  paymentBlock.textContent = valid ? "" : "Choose payment";
  return valid;
}

function setValidation(input: HTMLInputElement | HTMLSelectElement, valid: boolean, msg: string): boolean {
  const errorField = input.parentElement!.querySelector(".error-msg")!;
  if (!valid) {
    input.classList.add("error");
    errorField.textContent = msg;
  } else {
    input.classList.remove("error");
    errorField.textContent = "";
  }
  return valid;
}

function fillStreetsDropdown() {
  street.innerHTML = "";
  streetsByCity[city.value].forEach(st => {
    const option = document.createElement("option");
    option.value = st;
    option.textContent = st;
    street.appendChild(option);
  });
  street.disabled = false;
}

function toggleButton() {
  const allValid =
    validateLogin() &&
    validatePassword() &&
    validateConfirm() &&
    validateCity() &&
    validateStreet() &&
    validateHouse() &&
    validatePayment();

  if (allValid) {
    registerBtn.disabled = false;
    registerBtn.classList.add("enabled");
  } else {
    registerBtn.disabled = true;
    registerBtn.classList.remove("enabled");
  }
}

login.addEventListener("blur", () => {
  validateLogin();
  toggleButton();
});
password.addEventListener("blur", () => {
  validatePassword();
  toggleButton();
});
confirmPassword.addEventListener("blur", () => {
  validateConfirm();
  toggleButton();
});
city.addEventListener("blur", () => {
  validateCity();
  toggleButton();
});
street.addEventListener("blur", () => {
  validateStreet();
  toggleButton();
});
house.addEventListener("blur", () => {
  validateHouse();
  toggleButton();
});


city.addEventListener("change", () => {
  fillStreetsDropdown();
  validateCity();
});

document.querySelector("#registerForm")!.addEventListener("submit", async (e) => {
  e.preventDefault();
  backendError.textContent = "";

  const payment = document.querySelector<HTMLInputElement>("input[name='payment']:checked")!.value;

  const body = {
    login: login.value.trim(),
    password: password.value.trim(),
    confirmPassword: confirmPassword.value.trim(),
    city: city.value,
    street: street.value,
    houseNumber: Number(house.value),
    paymentMethod: payment,
  };

  try {
    const res = await fetch("https://6kt29kkeub.execute-api.eu-central-1.amazonaws.com/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const error = await res.json();
      backendError.textContent = error.message || "Registration failed.";
      return;
    }

    alert("Registration successful!");
    window.location.href = "../sign-in-page/sign-in.html";
  } catch {
    backendError.textContent = "Network error.";
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const menuIcon = document.querySelector(".menu-with-icon-header");
  const cartIcon = document.querySelector(".shopping-bag-icon");
  if (menuIcon) {
    menuIcon.addEventListener("click", () => {
      window.location.href = "../menu-page/menu.html";
    });
  }

  if (cartIcon) {
    cartIcon.addEventListener("click", () => {
      window.location.href = "../cart-page/cart.html";
    });
  }
});
