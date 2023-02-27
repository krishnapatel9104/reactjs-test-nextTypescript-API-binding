import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch as useAppDispatch, useSelector as useAppSelector } from 'react-redux';
import rootReducer from './root.reducer';
import { AppDispatch } from './redux.type';
const store = configureStore({
  reducer: rootReducer
});
type ReduxSelectorState = ReturnType<typeof rootReducer>;
const { dispatch } = store;
const useDispatch = () => useAppDispatch<AppDispatch>();
const useSelector: TypedUseSelectorHook<ReduxSelectorState> = useAppSelector;
export { store, dispatch, useSelector, useDispatch };