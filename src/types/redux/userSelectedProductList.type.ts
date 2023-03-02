export interface userCartProductsType {
  cartProductDetails: userCartProductType[]
}

export interface userCartProductType {
  id?: number
  // userId: number
  productId: number
  quantity: number
  size: number
  color: number
  cartId?: number
}

export interface updateCartProductType {
  id: number
  quantity?: string
  size?: number
  color?: number
}