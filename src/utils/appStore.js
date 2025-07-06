import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import ConnectionReducer from "./connectionSlice";
import RequestSlice from "./requestSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connection: ConnectionReducer,
    request: RequestSlice,
  },
});

export default appStore;
