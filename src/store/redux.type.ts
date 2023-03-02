import { UserType } from '../types/redux/user.type';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { userCartProductsType } from '../types/redux/userSelectedProductList.type';
import { userShippingResDataType } from '../types/redux/userShippingDetails.type';
import { userPaymentDetailsResType } from '../types/redux/userPaymentDetails.type';
import { cartProductListsType } from '../types/redux/cartProductLists.type';

export interface RootReduxState {
  UserSlice: UserType;
  userSelectedProductListSlice: userCartProductsType;
  userShippingDetailsSlice: userShippingResDataType;
  userPaymentDetailsSlice: userPaymentDetailsResType;
  allMenuAndProductListSlice: any;
  productListsSlice: cartProductListsType;

}
export type AppDispatch = ThunkDispatch<RootReduxState, unknown, Action<string>>;