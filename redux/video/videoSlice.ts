import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { IVideo } from "../../models/video";

interface VideoState {
  currentVideo: IVideo | null;
  loading: boolean;
  error: boolean | string;
}

// Define the initial state using that type
const initialState: VideoState = {
  currentVideo: null,
  loading: false,
  error: false,
};

export const videoSlice = createSlice({
  name: "video",

  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },
    fetchSuccess: (state, action: PayloadAction<IVideo>) => {
      state.loading = false;
      state.currentVideo = action.payload;
    },
    fetchError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    like: (state, action) => {
      if (!state.currentVideo?.likes.includes(action.payload)) {
        state.currentVideo?.likes.push(action.payload);
        state.currentVideo?.dislikes.splice(
          state.currentVideo.dislikes.findIndex(
            (userId) => userId === action.payload
          ),
          1
        );
      } else {
      }
    },
    dislike: (state, action) => {
      if (!state.currentVideo?.dislikes.includes(action.payload)) {
        state.currentVideo?.dislikes.push(action.payload);
        state.currentVideo?.likes.splice(
          state.currentVideo.likes.findIndex(
            (userId) => userId === action.payload
          ),
          1
        );
      } else {
      }
    },
  },
});

export const { like, dislike, fetchStart, fetchError, fetchSuccess } =
  videoSlice.actions;

export default videoSlice.reducer;
