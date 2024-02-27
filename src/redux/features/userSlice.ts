import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store.ts';

interface UserState {
  users: string[];
}

const initialState: UserState = {
  users: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<string>) => {
      state.users.push(action.payload);
    },
  },
});

export const { addUser } = userSlice.actions;

export const selectUsers = (state: RootState) => state.user.users;

export default userSlice.reducer;