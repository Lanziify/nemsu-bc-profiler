import { configureStore } from "@reduxjs/toolkit";
import ProfileSlice from "./profileSlice";


export default configureStore({
  reducer: {
    profiles: ProfileSlice
  },
});