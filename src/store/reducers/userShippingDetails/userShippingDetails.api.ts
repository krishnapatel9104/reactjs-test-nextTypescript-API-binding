import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import baseURL from '../../../api';
import { userShippingDataType } from '../../../types/redux/userShippingDetails.type';

export const addShippingDetails = createAsyncThunk('api/shipping/add', async (details: { values: userShippingDataType, token: string }) => {
  let method = 'POST'
  let url = `${baseURL}/shipping/add`
  let data = details.values
  let headers = {
    "Authorization": `Bearer ${details.token}`,
    "Content-Type": "application/json",
  }
  let response = await axios({ method, url, headers, data })
  return response.data
})

export const getShippingDetails = createAsyncThunk('api/shipping', async (details: { token: string, cartId: number }) => {
  let method = 'GET'
  let url = `${baseURL}/shipping/${details.cartId}`
  let headers = {
    "Authorization": `Bearer ${details.token}`,
    "Content-Type": "application/json",
  }
  let response = await axios({ method, url, headers })
  return response.data
})