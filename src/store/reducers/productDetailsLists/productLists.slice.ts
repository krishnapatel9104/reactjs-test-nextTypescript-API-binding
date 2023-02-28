import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { allMenuAndProductListsType } from '../../../types/redux/allMenuAndProductLists.type';
import { brandType } from '../../../types/constants/brand.type';
import { categoryType } from "../../../types/constants/category.type";
import { genderType } from '../../../types/constants/gender.type';
import { productsType, productType } from '../../../types/redux/productLists.type';
import { addProductToCart } from './productLists.api';
import { userCartProductsType,userCartProductType } from "../../../types/redux/userSelectedProductList.type";

const initialState: userCartProductsType = {
  cartProductDetails: []
};
export const productListsSlice = createSlice({
  name: "userSelectedProductList",
  initialState: initialState,
  reducers: {
    // setFilterProductLists: (state: productsType, action: PayloadAction<productType[]>) => {
    //   console.log("action.paylod set oproduct lists slice : ", action.payload);
    //   state.productLists = action.payload
    // }
  },
  extraReducers: (builder) => {
    builder.addCase(addProductToCart.fulfilled, (state, action: PayloadAction<userCartProductType>) => {
      console.log("in redux extra builder : ", action.payload);
      state.cartProductDetails.concat(action.payload);
      // state.cartProductDetails = action.payload
    })
  }
});

export const {
  // setFilterProductLists
} = productListsSlice.actions;

export default productListsSlice.reducer;
