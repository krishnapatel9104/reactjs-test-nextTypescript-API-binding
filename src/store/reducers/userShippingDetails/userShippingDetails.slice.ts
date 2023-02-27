import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userShippingDataType } from '../../../types/redux/userShippingDetails.type';
const initialState: userShippingDataType = {
  firstName: '',
  lastName: '',
  emailAddress: '',
  phoneNumber: '',
  deliveryDate: '',
  convenientTime: '',
  city: '0',
  address: '',
  zipCode: ''
};
export const userShippingDetailsSlice = createSlice({
  name: "userShippingDetails",
  initialState: initialState,
  reducers: {
    setUserDetails: (state: userShippingDataType, action: PayloadAction<userShippingDataType>) => {
      return {
        ...state,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        emailAddress: action.payload.emailAddress,
        phoneNumber: action.payload.phoneNumber,
        deliveryDate: action.payload.deliveryDate,
        convenientTime: action.payload.convenientTime,
        city: action.payload.city,
        address: action.payload.address,
        zipCode: action.payload.zipCode,
      }
    },
    resetShippingDetails: (state: userShippingDataType) => {
      return {
        ...state,
        firstName: '',
        lastName: '',
        emailAddress: '',
        phoneNumber: '',
        deliveryDate: '',
        convenientTime: '',
        city: '0',
        address: '',
        zipCode: ''
      }
    },
  },
});

export const { setUserDetails, resetShippingDetails } = userShippingDetailsSlice.actions;

export default userShippingDetailsSlice.reducer;
