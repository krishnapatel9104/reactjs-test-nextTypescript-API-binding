import { createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import { allMenuAndProductListsType } from '../../../types/redux/allMenuAndProductLists.type';
import { brandType } from '../../../types/constants/brand.type';
import { categoryType } from "../../../types/constants/category.type";
import { genderType } from '../../../types/constants/gender.type';
import { productsType, productType } from '../../../types/redux/productLists.type';
import { addProductToCart, getCartProductList, updateProductToCart, deleteProductToCart } from './productLists.api';
import { userCartProductsType, userCartProductType } from "../../../types/redux/userSelectedProductList.type";
import { cartProductListsType } from "../../../types/redux/cartProductLists.type";

const initialState: cartProductListsType = {
  cartItemsDetails: [],
  totalInfo: {
    grandTotal: 0,
    subTotal: 0,
    Shipping: 0,
    VatAndTax: 0
  },
  userId: 0,
  shippingId: 0,
  checkoutId: 0
};
export const productListsSlice = createSlice({
  name: "userSelectedProductList",
  initialState: initialState,
  reducers: {
    resetProductLists: (state: cartProductListsType) => {
      return {
        ...state,
        cartItemsDetails: [],
        totalInfo: {
          grandTotal: 0,
          subTotal: 0,
          Shipping: 0,
          VatAndTax: 0
        },
        userId: 0,
        shippingId: 0,
        checkoutId: 0
      }
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(isAnyOf(addProductToCart.fulfilled, getCartProductList.fulfilled, updateProductToCart.fulfilled, deleteProductToCart.fulfilled), (state, action: PayloadAction<cartProductListsType>) => {
      console.log("in redux extra builder get method restore : ", action.payload);
      state.cartItemsDetails = action.payload.cartItemsDetails
      state.totalInfo = action.payload.totalInfo
    })
  }
});

export const {
  resetProductLists
  // setFilterProductLists
} = productListsSlice.actions;

export default productListsSlice.reducer;
