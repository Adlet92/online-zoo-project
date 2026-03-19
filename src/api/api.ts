import { CameraResponse, FeedbackResponse, PetsResponse } from "../types/api"

const BASE_URL = "https://vsqsnqnxkh.execute-api.eu-central-1.amazonaws.com/prod"

export async function getPets(): Promise<PetsResponse> {
  const response: Response = await fetch(`${BASE_URL}/pets`)

  if (!response.ok) {
    throw new Error("Failed to fetch pets")
  }

  const data: PetsResponse = await response.json()
  return data
}

export async function getFeedback(): Promise<FeedbackResponse> {
  const response: Response = await fetch(`${BASE_URL}/feedback`)

  if (!response.ok) {
    throw new Error("Failed to fetch feedback")
  }

  const data: FeedbackResponse = await response.json()
  return data
}
export async function getCameras(): Promise<CameraResponse> {
  const response = await fetch(`${BASE_URL}/cameras`)

  if (!response.ok) {
    throw new Error("Failed to fetch cameras")
  }

  return response.json()
}
export async function getPetById(id: number) {
  const response = await fetch(`${BASE_URL}/pets/${id}`)

  if (!response.ok) {
    throw new Error("Failed to fetch pet")
  }

  return response.json()
}

