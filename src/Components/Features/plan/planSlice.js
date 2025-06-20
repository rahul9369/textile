// src/features/plan/planSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedPlan: null,
};

const planSlice = createSlice({
  name: "plan",
  initialState,
  reducers: {
    setSelectedPlan: (state, action) => {
      state.selectedPlan = action.payload;
    },
  },
});

export const { setSelectedPlan } = planSlice.actions;
export default planSlice.reducer;
