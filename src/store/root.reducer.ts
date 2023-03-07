import { combineReducers } from 'redux';
import { RootReduxState } from '../store/redux.type';
import userShippingDetailsSlice from './reducers/userShippingDetails/userShippingDetails.slice';
import userPaymentDetailsSlice from './reducers/userPaymentDetails/userPaymentDetails.slice';
import productListsSlice from './reducers/productDetailsLists/productLists.slice';

const rootReducer = combineReducers<RootReduxState>({
  userShippingDetailsSlice,
  userPaymentDetailsSlice,
  productListsSlice
});
export default rootReducer;