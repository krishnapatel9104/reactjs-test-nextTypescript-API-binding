import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userShippingDataType, userShippingResDataType } from '../../../types/redux/userShippingDetails.type';
import { addShippingDetails } from "./userShippingDetails.api";
const initialState: userShippingResDataType = {
  shippingId: 0
  // firstName: '',
  // lastName: '',
  // emailAddress: '',
  // phoneNumber: '',
  // deliveryDate: '',
  // convenientTime: '',
  // city: '0',
  // address: '',
  // zipCode: ''
};
export const userShippingDetailsSlice = createSlice({
  name: "userShippingDetails",
  initialState: initialState,
  reducers: {
    // setUserDetails: (state: userShippingDataType, action: PayloadAction<userShippingResDataType>) => {
    //   return {
    //     ...state,
    //     firstName: action.payload.firstName,
    //     lastName: action.payload.lastName,
    //     emailAddress: action.payload.emailAddress,
    //     phoneNumber: action.payload.phoneNumber,
    //     deliveryDate: action.payload.deliveryDate,
    //     convenientTime: action.payload.convenientTime,
    //     city: action.payload.city,
    //     address: action.payload.address,
    //     zipCode: action.payload.zipCode,
    //   }
    // },
    resetShippingDetails: (state: userShippingResDataType) => {
      return {
        ...state,
        shippingId: 0
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addShippingDetails.fulfilled, (state, action: PayloadAction<userShippingResDataType>) => {
      console.log("in redux extra builder get method restore : ", action.payload);
      state.shippingId = action.payload.shippingId
    })
  }
});

export const { resetShippingDetails} = userShippingDetailsSlice.actions;

export default userShippingDetailsSlice.reducer;
