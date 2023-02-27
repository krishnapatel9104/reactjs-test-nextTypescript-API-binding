export interface productsType {
  id: number
  productName: string
  productImages: string[]
  productDescription: string[]
  productOriginalPrice: number
  productCurrentPrice: number
  brand: {
    id: number,
    name: string,
    slug: string
  },
  gender: {
    id: number,
    name: string,
    slug: string
  },
  category: {
    id: number,
    name: string,
    slug: string
  },
  size: number[]
  color: number[]
  reviewRate: number,
  slug: string,
  type: number
}