type User = {
  name: string
  email: string
}

export async function getUser(): Promise<User | null> {

  const token = localStorage.getItem("token")

  if (!token) return null

  const response = await fetch(`${BASE_URL}/auth/profile`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

   if (response.status === 401) {
    localStorage.removeItem("token")
    return null
  }

  if (!response.ok) return null

  const result = await response.json()

  return result.data
}

export function logout(): void {
  localStorage.removeItem("token")
  location.reload()
}

const BASE_URL = "https://vsqsnqnxkh.execute-api.eu-central-1.amazonaws.com/prod"

export async function registerUser(data: {
  login: string
  password: string
  name: string
  email: string
}) {

  const response = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Registration failed")
  }

  return response.json()
}


export async function loginUser(data: {
  login: string
  password: string
}) {

  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })

  if (!response.ok) {
    throw new Error("Incorrect login or password")
  }
  const result = await response.json()
  console.log("LOGIN DATA:", result.data)
  console.log("LOGIN user:", result.data.user)

  localStorage.setItem("token", result.data.access_token)

  return result
}
