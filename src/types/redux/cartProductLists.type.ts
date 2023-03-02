import { productType } from './productLists.type';
export interface CartItemsDetailType {
  id: number;
  cartId: number;
  quantity: number;
  size: number;
  color: number;
  productId: number;
}

export interface TotalInfoType {
  grandTotal: number;
  subTotal: number;
  Shipping?: number;
  VatAndTax?: number;
}

export interface cartProductListsType {
  cartItemsDetails: CartItemsDetailType[];
  totalInfo: TotalInfoType;
  userId?: number
  shippingId?: number
  checkoutId?: number
}

export interface getCartProductType {
  id: number
  color: number
  size: number
  quantity: number
  products: productType
}