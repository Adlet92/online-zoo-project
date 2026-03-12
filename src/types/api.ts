export interface Pet {
  id: number
  name: string
  commonName: string
  description: string
  image: string
}
export interface PetsResponse {
  data: Pet[]
}
export interface Feedback {
  id: number
  name: string
  city: string
  month: string
  year: string
  text: string
}
export interface FeedbackResponse {
  data: Feedback[]
}
export interface Camera {
  id: number
  petId: number
  text: string
}

export interface CameraResponse {
  data: Camera[]
}
