import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import baseURL from '../../../api';
import { productType } from '../../../types/redux/productLists.type';
import { userCartProductType } from '../../../types/redux/userSelectedProductList.type';

export const addProductToCart = createAsyncThunk('api/cart/add', async (productDetails: userCartProductType) => {
  console.log("api thunk add to cart product : ", productDetails);
  const response = await axios.post(`${baseURL}/cart/add`, productDetails)
  console.log("repsonse of cart details add : ", response.data);

  return response.data
})

export const updateProductToCart = createAsyncThunk('api/cart', async (productDetails: userCartProductType) => {
  console.log("api thunk update to cart product : ", productDetails);
  const response = await axios.put(`${baseURL}/cart`, productDetails)
  console.log("repsonse of cart details update : ", response.data);

  return response.data
})

export const deleteProductToCart = createAsyncThunk('api/cart/:id', async (id: number) => {
  console.log("api thunk delete cart product : ", id);
  const response = await axios.delete(`${baseURL}/cart/` + id)
  console.log("repsonse of cart details delete : ", response.data);

  return response.data
})