export interface userPaymentDetailsType {
  paymentMethod: string
  cardName: string
  cardNumber: string
  expiration: string
  cvvCode: number
  userId?: number
}

export interface userPaymentDetailsResType {
  checkoutId: number
}