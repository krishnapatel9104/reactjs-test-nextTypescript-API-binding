import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userShippingDataType, userShippingResDataType } from '../../../types/redux/userShippingDetails.type';
import { addShippingDetails } from "./userShippingDetails.api";
const initialState: userShippingResDataType = {
  shippingId: 0
};
export const userShippingDetailsSlice = createSlice({
  name: "userShippingDetails",
  initialState: initialState,
  reducers: {
    resetShippingDetails: (state: userShippingResDataType) => {
      return {
        ...state,
        shippingId: 0
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addShippingDetails.fulfilled, (state, action: PayloadAction<userShippingResDataType>) => {
      state.shippingId = action.payload.shippingId
    })
  }
});
export const { resetShippingDetails} = userShippingDetailsSlice.actions;
export default userShippingDetailsSlice.reducer;
