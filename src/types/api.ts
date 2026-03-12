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
  // date: string
  month: string
  year: string
  text: string
}
export interface FeedbackResponse {
  data: Feedback[]
}
