import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import baseURL from '../../../api';
import { filtersType } from '../../../types/redux/allMenuAndProductLists.type';

export const getAllBrandLists = createAsyncThunk('api/brand', async () => {
  const response = await axios.get(`${baseURL}/brand`)
  return response.data
})

export const getAllCategoryLists = createAsyncThunk('api/category', async () => {
  const response = await axios.get(`${baseURL}/category`)
  return response.data
})

export const getAllGenderLists = createAsyncThunk('api/gender', async () => {
  const response = await axios.get(`${baseURL}/gender`)
  return response.data
})

export const getAllProductLists = createAsyncThunk('api/product', async () => {
  const response = await axios.get(`${baseURL}/product`)
  console.log("response data of filter : ", response.data);

  return response.data
})

export const getAllFiltersProductLists = createAsyncThunk('api/product', async (filters: filtersType) => {
  const response = await axios.get(`${baseURL}/product`, {
    params: filters
  })
  console.log("response data of filter : ", response.data);

  return response.data
})