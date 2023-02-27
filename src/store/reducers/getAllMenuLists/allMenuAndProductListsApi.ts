import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import baseURL from '../../../api';

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
  return response.data
})