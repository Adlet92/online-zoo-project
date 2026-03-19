export function validateLogin(login: string): string | null {

  if (!login) return "Login is required"

  if (!/^[A-Za-z][A-Za-z]{2,}$/.test(login))
    return "Login must start with a letter and contain only English letters (min 3)"

  return null
}

export function validateName(name: string): string | null {

  if (!name) return "Name is required"

  if (!/^[A-Za-z]{3,}$/.test(name))
    return "Name must contain only English letters (min 3)"

  return null
}

export function validatePassword(password: string): string | null {

  if (!password) return "Password is required"

  if (password.length < 6)
    return "Password must be at least 6 characters"

  if (!/[!@#$%^&*]/.test(password))
    return "Password must contain a special character"

  return null
}

export function validateConfirmPassword(
  password: string,
  confirm: string
): string | null {

  if (!confirm) return "Confirm password is required"

  if (password !== confirm)
    return "Passwords do not match"

  return null
}

export function validateEmail(email: string): string | null {

  if (!email) return "Email is required"

  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!pattern.test(email))
    return "Invalid email format"

  return null
}
