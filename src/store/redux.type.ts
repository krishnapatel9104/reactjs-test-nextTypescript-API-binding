import { UserType } from '../types/redux/user.type';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { userCartProductsType } from '../types/redux/userSelectedProductList.type';
import { userShippingDataType } from '../types/redux/userShippingDetails.type';
import { userPaymentDetailsType } from '../types/redux/userPaymentDetails.type';
import { productListsSlice } from './reducers/productDetailsLists/productLists.slice';
import { productsType } from '../types/redux/productLists.type';

export interface RootReduxState {
  UserSlice: UserType;
  userSelectedProductListSlice: userCartProductsType;
  userShippingDetailsSlice: userShippingDataType;
  userPaymentDetailsSlice: userPaymentDetailsType;
  allMenuAndProductListSlice: any;
  productListsSlice: userCartProductsType

}
export type AppDispatch = ThunkDispatch<RootReduxState, unknown, Action<string>>;