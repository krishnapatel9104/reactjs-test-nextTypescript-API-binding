import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import baseURL from '../../../api';
import { updateCartProductType, userCartProductType } from '../../../types/redux/userSelectedProductList.type';

export const addProductToCart = createAsyncThunk('api/cart/add', async (productDetails: userCartProductType) => {
  let method = 'POST'
  let url = `${baseURL}/cart/add`
  let data = productDetails
  let headers = {
    "Authorization": `Bearer ${productDetails.token}`,
    "Content-Type": "application/json",
  }
  let response = await axios({ method, url, headers, data })
  return response.data
})

export const updateProductToCart = createAsyncThunk('api/cart', async (productDetails: updateCartProductType) => {
  let method = 'PUT'
  let url = `${baseURL}/cart`
  let data = productDetails
  let headers = {
    "Authorization": `Bearer ${productDetails.token}`,
    "Content-Type": "application/json",
  }
  let response = await axios({ method, url, headers, data })
  return response.data
})

export const deleteProductToCart = createAsyncThunk('api/cart/:id', async (details: { productId: number, token: string }) => {
  let method = 'DELETE'
  let url = `${baseURL}/cart/${details.productId}`
  let headers = {
    "Authorization": `Bearer ${details.token}`,
    "Content-Type": "application/json",
  }
  let response = await axios({ method, url, headers })
  return response.data
})

export const getCartProductList = createAsyncThunk('api/cart', async (token: string) => {
  let method = 'GET'
  let url = `${baseURL}/cart`
  let headers = {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json",
  }
  let response = await axios({ method, url, headers })
  return response.data
})