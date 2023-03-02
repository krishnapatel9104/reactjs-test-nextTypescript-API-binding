import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import baseURL from '../../../api';
import { userShippingDataType } from '../../../types/redux/userShippingDetails.type';
import { userPaymentDetailsType } from '../../../types/redux/userPaymentDetails.type';
import { userCartProductsType } from '../../../types/redux/userSelectedProductList.type';
import { cartProductListsType } from '../../../types/redux/cartProductLists.type';

export const addCheckoutDetails = createAsyncThunk('api/checkout/add', async (values: userPaymentDetailsType) => {
  values.userId = 1;
  // console.log("api thunk get cart product checkout : ", values);
  const response = await axios.post(`${baseURL}/checkout/add`, values)
  // console.log("repsonse of checkouot details get : ", response.data);

  return response.data
})

export const addOrderDetails = createAsyncThunk('api/orderDetail/add', async (cartDetailsObject: cartProductListsType) => {
  // console.log("111111111111111111111111111111111  BODYYYYYYYYYYY ORDER :", cartDetailsObject);

  cartDetailsObject.userId = 1;
  // console.log("api thunk get cart product : ", cartDetailsObject);
  const response = await axios.post(`${baseURL}/orderDetail/add`, cartDetailsObject)
  // console.log("repsonse of order details get : ", response.data);

  return response.data
})