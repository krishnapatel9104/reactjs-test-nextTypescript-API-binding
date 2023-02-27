export interface productsType {
  id: number
  productName: string
  productImages: productImage[]
  productDescription: string[]
  productOriginalPrice: number
  productCurrentPrice: number
  gender: number
  category: number
  brand: number
  size: number[]
  color: number[]
  reviewRate: number,
  slug: string
}

export interface productImage {
  id: number
  productImage: string
}