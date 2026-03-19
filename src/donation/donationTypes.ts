export type DonationState = {
  amount: number | null

  pet: {
    id: number
    name: string
  } | null

  isMonthly: boolean

  name: string
  email: string

  cardNumber: string
  expiry: string
  cvv: string

  saveCard: boolean
}
