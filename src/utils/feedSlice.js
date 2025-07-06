import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => {
      return action.payload;
    },
    removeUserFeed: (state, action) => {
      const userFeed = state.filter((user) => user._id !== action.payload);
      return userFeed;
    },
  },
});

export const { addFeed, removeUserFeed } = feedSlice.actions;
export default feedSlice.reducer;
