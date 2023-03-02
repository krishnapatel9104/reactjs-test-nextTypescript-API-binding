import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import baseURL from '../../../api';
import { updateCartProductType, userCartProductType } from '../../../types/redux/userSelectedProductList.type';

export const addProductToCart = createAsyncThunk('api/cart/add', async (productDetails: userCartProductType) => {
  const response = await axios.post(`${baseURL}/cart/add`, productDetails)
  return response.data
})

export const updateProductToCart = createAsyncThunk('api/cart', async (productDetails: updateCartProductType) => {
  const response = await axios.put(`${baseURL}/cart`, productDetails)
  return response.data
})

export const deleteProductToCart = createAsyncThunk('api/cart/:id', async (id: number) => {
  const response = await axios.delete(`${baseURL}/cart/` + id)
  return response.data
})

export const getCartProductList = createAsyncThunk('api/cart', async (id: number) => {
  const response = await axios.get(`${baseURL}/cart/` + id)
  return response.data
})