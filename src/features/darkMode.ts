import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface DarkModeState {
  value: boolean;
}

const initialState: DarkModeState = {
  value: true,
};

export const darkModeSlice = createSlice({
  name: "darkMode",
  initialState,
  reducers: {
    toggle: (state) => {
      state.value = !state.value;
    },
    setValue: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggle, setValue } = darkModeSlice.actions;

export default darkModeSlice.reducer;
