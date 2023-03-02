import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import baseURL from '../../../api';
import { userShippingDataType } from '../../../types/redux/userShippingDetails.type';

export const addShippingDetails = createAsyncThunk('api/shipping/add', async (values: userShippingDataType) => {
  values.userId = 1;
  const response = await axios.post(`${baseURL}/shipping/add`, values)
  return response.data
})