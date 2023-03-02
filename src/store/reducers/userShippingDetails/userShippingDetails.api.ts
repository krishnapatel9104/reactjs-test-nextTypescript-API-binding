import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import baseURL from '../../../api';
import { userShippingDataType } from '../../../types/redux/userShippingDetails.type';

export const addShippingDetails = createAsyncThunk('api/shipping/add', async (values: userShippingDataType) => {
  values.userId = 1;
  // console.log("api thunk get cart product : ", values);
  const response = await axios.post(`${baseURL}/shipping/add`, values)
  // console.log("repsonse of shipping details get : ", response.data);

  return response.data
})