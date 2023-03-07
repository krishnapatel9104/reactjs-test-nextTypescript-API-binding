import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userPaymentDetailsResType } from "../../../types/redux/userPaymentDetails.type";
import { addCheckoutDetails, getCheckoutDetails } from "./userPaymentDetails.api";
const initialState: userPaymentDetailsResType = {
  checkoutId: 0
};
export const userPaymentDetailsSlice = createSlice({
  name: "paymentDetails",
  initialState: initialState,
  reducers: {
    resetPaymentDetails: (state: userPaymentDetailsResType) => {
      return {
        ...state,
        checkoutId: 0
      }
    },
    setCheckoutDetails: (state: userPaymentDetailsResType, action: PayloadAction<userPaymentDetailsResType>) => {
      return {
        ...state,
        checkoutId: action.payload.checkoutId
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(addCheckoutDetails.fulfilled, (state, action: PayloadAction<userPaymentDetailsResType>) => {
      state.checkoutId = action.payload.checkoutId
    })
    builder.addCase(getCheckoutDetails.fulfilled, (state, action: PayloadAction<userPaymentDetailsResType>) => {
      state.checkoutId = action.payload.checkoutId
    })
  }
});
export const { resetPaymentDetails, setCheckoutDetails } = userPaymentDetailsSlice.actions;
export default userPaymentDetailsSlice.reducer;
