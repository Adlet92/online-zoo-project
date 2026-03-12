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
  location: string
  date: string
  message: string
}
export interface FeedbackResponse {
  data: Feedback[]
}
