export interface productType {
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
  } | number,
  gender: {
    id: number,
    name: string,
    slug: string
  } | number,
  category: {
    id: number,
    name: string,
    slug: string
  } | number,
  size: number[]
  color: number[]
  reviewRate: number,
  slug: string,
  type: number
}

export interface productsType {
  productLists: productType[]
}