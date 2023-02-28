import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAllBrandLists, getAllCategoryLists, getAllProductLists, getAllGenderLists } from "./allMenuAndProductListsApi";
import { allMenuAndProductListsType } from '../../../types/redux/allMenuAndProductLists.type';
import { brandType } from '../../../types/constants/brand.type';
import { categoryType } from "../../../types/constants/category.type";
import { productsType } from '../../../types/constants/products.type';
import { genderType } from '../../../types/constants/gender.type';

const initialState: allMenuAndProductListsType = {
  brandLists: [],
  genderLists: [],
  categoryLists: [],
  sizeLists: [],
  colorLists: [],
  productLists: [],
  checkoutNewArrivalsProductLists: [],
  bestSellerProductLists: [],
  bestDealProductLists: []
};
export const allMenuAndProductListSlice = createSlice({
  name: "userSelectedProductList",
  initialState: initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getAllBrandLists.fulfilled, (state, action: PayloadAction<brandType[]>) => {
      state.brandLists = action.payload
    })
    builder.addCase(getAllCategoryLists.fulfilled, (state, action: PayloadAction<categoryType[]>) => {
      state.categoryLists = action.payload
    })
    builder.addCase(getAllGenderLists.fulfilled, (state, action: PayloadAction<genderType[]>) => {
      state.genderLists = action.payload
    })
    builder.addCase(getAllProductLists.fulfilled, (state, action: PayloadAction<productsType[]>) => {
      let checkoutNewArrivals = action.payload.filter((product) => product.type === 1);
      console.log("checkout : ", checkoutNewArrivals.length);

      let bestDeal = action.payload.filter((product) => product.type === 2);
      console.log("bestdeal : ", bestDeal.length);

      let bestSeller = action.payload.filter((product) => product.type === 3);
      console.log("bestseller : ", bestSeller.length);

      console.log("productLists : ", action.payload.length);

      state.checkoutNewArrivalsProductLists = checkoutNewArrivals;
      state.bestDealProductLists = bestDeal;
      state.bestSellerProductLists = bestSeller;
      state.productLists = action.payload;
    })
  }
});

export const {
} = allMenuAndProductListSlice.actions;

export default allMenuAndProductListSlice.reducer;
