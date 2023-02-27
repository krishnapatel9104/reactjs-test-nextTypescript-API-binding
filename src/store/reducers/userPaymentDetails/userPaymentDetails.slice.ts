import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userPaymentDetailsType } from "../../../types/redux/userPaymentDetails.type";
const initialState: userPaymentDetailsType = {
  paymentMethod: '',
  cardName: '',
  cardNumber: '',
  expiration: '',
  cvvCode: 0
};
export const userPaymentDetailsSlice = createSlice({
  name: "paymentDetails",
  initialState: initialState,
  reducers: {
    setPaymentDetails: (state: userPaymentDetailsType, action: PayloadAction<userPaymentDetailsType>) => {
      return {
        ...state,
        paymentMethod: action.payload.paymentMethod,
        cardName: action.payload.cardName,
        cardNumber: action.payload.cardNumber,
        expiration: action.payload.expiration,
        cvvCode: action.payload.cvvCode
      }
    },
    resetPaymentDetails: (state: userPaymentDetailsType) => {
      return {
        ...state,
        paymentMethod: '',
        cardName: '',
        cardNumber: '',
        expiration: '',
        cvvCode: 0
      }
    },
  },
});

export const { setPaymentDetails, resetPaymentDetails } = userPaymentDetailsSlice.actions;

export default userPaymentDetailsSlice.reducer;
