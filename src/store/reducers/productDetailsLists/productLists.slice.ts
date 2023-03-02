import { createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import { addProductToCart, getCartProductList, updateProductToCart, deleteProductToCart } from './productLists.api';
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
      state.cartItemsDetails = action.payload.cartItemsDetails
      state.totalInfo = action.payload.totalInfo
    })
  }
});

export const {
  resetProductLists
} = productListsSlice.actions;

export default productListsSlice.reducer;
