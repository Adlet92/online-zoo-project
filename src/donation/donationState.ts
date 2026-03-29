import { DonationState } from "./donationTypes"

export const state: DonationState = {
  amount: null,
  pet: null,
  isMonthly: false,

  name: "",
  email: "",

  cardNumber: "",
  expiry: "",
  cvv: "",

  saveCard: false,
}
