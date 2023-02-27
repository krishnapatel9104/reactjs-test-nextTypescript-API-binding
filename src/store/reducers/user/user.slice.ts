import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserType } from '../../../types/redux/user.type';

const initialState: UserType = {
  id: 0,
  username: '',
  password: 0
}
const UserSlice = createSlice({
  name: 'UserSlice',
  initialState: initialState,
  reducers: {
    setUser: (state: UserType, action: PayloadAction<UserType>) => {
      return {
        ...state,
        id: action.payload.id,
        username: action.payload.username,
        password: action.payload.password
      };
    }
  }
});
export const { setUser } = UserSlice.actions;
export default UserSlice.reducer;