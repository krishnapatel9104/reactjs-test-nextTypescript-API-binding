import { brandType } from '../constants/brand.type';
import { categoryType } from '../constants/category.type';
import { sizeType } from '../constants/size.type';
import { colorType } from '../constants/color.type';
import { productsType } from '../constants/products.type';
import { genderType } from '../constants/gender.type';
export interface allMenuAndProductListsType {
  brandLists?: brandType[],
  genderLists?: genderType[],
  categoryLists?: categoryType[],
  sizeLists?: sizeType[],
  colorLists?: colorType[],
  productLists?: productsType[],
  checkoutNewArrivalsProductLists?: number[],
  bestSellerProductLists?: number[],
  bestDealProductLists?: number[]
}