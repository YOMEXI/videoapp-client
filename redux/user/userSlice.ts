import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../models/user";
import { channel } from "diagnostics_channel";

interface UserState {
  currentUser: IUser | null;
  loading: boolean;
  error: boolean | string;
}

// Define the initial state using that type
const initialState: UserState = {
  currentUser: null,
  loading: false,
  error: false,
};

export const userSlice = createSlice({
  name: "user",

  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action: PayloadAction<IUser>) => {
      state.loading = false;
      state.currentUser = action.payload;
    },
    loginError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      return (state = initialState);
    },
    subscription: (state, action) => {
      if (state.currentUser?.subscribedUsers.includes(action.payload)) {
        state.currentUser.subscribedUsers.splice(
          state.currentUser.subscribedUsers.findIndex(
            (channelId) => channelId == action.payload
          ),
          1
        );
      } else {
        state.currentUser?.subscribedUsers.push(action.payload);
      }
    },
  },
});

export const { subscription, loginStart, loginError, loginSuccess, logout } =
  userSlice.actions;

export default userSlice.reducer;
