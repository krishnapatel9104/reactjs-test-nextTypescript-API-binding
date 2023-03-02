import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userPaymentDetailsType, userPaymentDetailsResType } from "../../../types/redux/userPaymentDetails.type";
import { addCheckoutDetails } from "./userPaymentDetails.api";
const initialState: userPaymentDetailsResType = {
  checkoutId: 0
  // paymentMethod: '',
  // cardName: '',
  // cardNumber: '',
  // expiration: '',
  // cvvCode: 0
};
export const userPaymentDetailsSlice = createSlice({
  name: "paymentDetails",
  initialState: initialState,
  reducers: {
    // setPaymentDetails: (state: userPaymentDetailsType, action: PayloadAction<userPaymentDetailsType>) => {
    //   return {
    //     ...state,
    //     paymentMethod: action.payload.paymentMethod,
    //     cardName: action.payload.cardName,
    //     cardNumber: action.payload.cardNumber,
    //     expiration: action.payload.expiration,
    //     cvvCode: action.payload.cvvCode
    //   }
    // },
    resetPaymentDetails: (state: userPaymentDetailsResType) => {
      return {
        ...state,
        checkoutId: 0
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addCheckoutDetails.fulfilled, (state, action: PayloadAction<userPaymentDetailsResType>) => {
      console.log("in redux extra builder get method restore : ", action.payload);
      state.checkoutId = action.payload.checkoutId
    })
  }
});

export const {resetPaymentDetails } = userPaymentDetailsSlice.actions;

export default userPaymentDetailsSlice.reducer;
