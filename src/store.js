// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice"; // Adjust the path if needed
import textileReducer from "./features/textiles/textilesSlice";
import generateReducer from "./features/generate/generateSlice";
import planReducer from "./features/plan/planSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    textile: textileReducer,
    generate: generateReducer,
    plan: planReducer,
  },
});
