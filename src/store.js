// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./components/Features/auth/authSlice"; // Adjust the path if needed
import textileReducer from "./components/Features/Textiles/textilesSlice";
import generateReducer from "./components/Features/Generate/generateSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    textile: textileReducer,
    generate: generateReducer,
  },
});
