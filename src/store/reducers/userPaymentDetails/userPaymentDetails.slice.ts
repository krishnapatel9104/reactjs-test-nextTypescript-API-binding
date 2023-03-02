import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userPaymentDetailsType, userPaymentDetailsResType } from "../../../types/redux/userPaymentDetails.type";
import { addCheckoutDetails } from "./userPaymentDetails.api";
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
  },
  extraReducers: (builder) => {
    builder.addCase(addCheckoutDetails.fulfilled, (state, action: PayloadAction<userPaymentDetailsResType>) => {
      state.checkoutId = action.payload.checkoutId
    })
  }
});
export const { resetPaymentDetails } = userPaymentDetailsSlice.actions;
export default userPaymentDetailsSlice.reducer;
