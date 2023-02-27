import { combineReducers } from 'redux';
import { RootReduxState } from '../store/redux.type';
import UserSlice from './reducers/user/user.slice';
import userSelectedProductListSlice from './reducers/userSelectedProductList/userSelectedProductList.slice';
import userShippingDetailsSlice from './reducers/userShippingDetails/userShippingDetails.slice';
import userPaymentDetailsSlice from './reducers/userPaymentDetails/userPaymentDetails.slice';
import allMenuAndProductListSlice from './reducers/getAllMenuLists/getAllMenuAndProductLists.slice';

const rootReducer = combineReducers<RootReduxState>({
  UserSlice,
  userSelectedProductListSlice,
  userShippingDetailsSlice,
  userPaymentDetailsSlice,
  allMenuAndProductListSlice
});
export default rootReducer;