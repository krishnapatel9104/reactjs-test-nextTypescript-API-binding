import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import baseURL from '../../../api';
import { userShippingDataType } from '../../../types/redux/userShippingDetails.type';
import { userPaymentDetailsType } from '../../../types/redux/userPaymentDetails.type';
import { userCartProductsType } from '../../../types/redux/userSelectedProductList.type';
import { cartProductListsType } from '../../../types/redux/cartProductLists.type';

export const addCheckoutDetails = createAsyncThunk('api/checkout/add', async (details: { values: userPaymentDetailsType, token: string }) => {

  let method = 'POST'
  let url = `${baseURL}/checkout/add`
  let data = details.values
  let headers = {
    "Authorization": `Bearer ${details.token}`,
    "Content-Type": "application/json",
  }
  let response = await axios({ method, url, headers, data })
  return response.data
})

export const addOrderDetails = createAsyncThunk('api/orderDetail/add', async (cartDetailsObject: cartProductListsType) => {

  let method = 'POST'
  let url = `${baseURL}/orderDetail/add`
  let data = cartDetailsObject
  let headers = {
    "Authorization": `Bearer ${cartDetailsObject.token}`,
    "Content-Type": "application/json",
  }
  let response = await axios({ method, url, headers, data })
  return response.data
})