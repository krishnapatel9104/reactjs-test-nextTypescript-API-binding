import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { userShippingResDataType } from '../types/redux/userShippingDetails.type';
import { userPaymentDetailsResType } from '../types/redux/userPaymentDetails.type';
import { cartProductListsType } from '../types/redux/cartProductLists.type';

export interface RootReduxState {
  userShippingDetailsSlice: userShippingResDataType;
  userPaymentDetailsSlice: userPaymentDetailsResType;
  productListsSlice: cartProductListsType;

}
export type AppDispatch = ThunkDispatch<RootReduxState, unknown, Action<string>>;