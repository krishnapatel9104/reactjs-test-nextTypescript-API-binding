export interface userPaymentDetailsType {
  paymentMethod: string
  cardName: string
  cardNumber: string
  expiration: string
  cvvCode: number
  cartId: number
}

export interface userPaymentDetailsResType {
  checkoutId: number
}