export interface userCartProductsType {
  cartProductDetails: userCartProductType[]
}

export interface userCartProductType {
  id?: number
  productId: number
  quantity: number
  size: number
  color: number
  cartId?: number
  token?: string
}

export interface updateCartProductType {
  id: number
  quantity?: string
  size?: number
  color?: number
  token?:string
}