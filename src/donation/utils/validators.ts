export function isValidAmount(value: string): boolean {
  return /^[0-9]+(\.[0-9]+)?$/.test(value) && Number(value) > 0
}

export function isValidName(value: string): boolean {
  return /^[A-Za-z\s]+$/.test(value)
}

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export function isValidCardNumber(value: string): boolean {
  return /^\d{16}$/.test(value)
}

export function isValidCVV(value: string): boolean {
  return /^\d{3}$/.test(value)
}

export function isValidExpiry(value: string): boolean {
  if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(value)) return false

  const [month, year] = value.split("/")
  const exp = new Date(2000 + Number(year), Number(month))

  return exp > new Date()
}
