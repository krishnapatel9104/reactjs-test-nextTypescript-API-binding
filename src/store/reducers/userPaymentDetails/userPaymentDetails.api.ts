import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import baseURL from '../../../api';
import { userShippingDataType } from '../../../types/redux/userShippingDetails.type';
import { userPaymentDetailsType } from '../../../types/redux/userPaymentDetails.type';
import { userCartProductsType } from '../../../types/redux/userSelectedProductList.type';
import { cartProductListsType } from '../../../types/redux/cartProductLists.type';

export const addCheckoutDetails = createAsyncThunk('api/checkout/add', async (values: userPaymentDetailsType) => {
  values.userId = 1;
  const response = await axios.post(`${baseURL}/checkout/add`, values)
  return response.data
})

export const addOrderDetails = createAsyncThunk('api/orderDetail/add', async (cartDetailsObject: cartProductListsType) => {
  cartDetailsObject.userId = 1;
  const response = await axios.post(`${baseURL}/orderDetail/add`, cartDetailsObject)
  return response.data
})