import { createSlice } from "@reduxjs/toolkit";

interface SidebarState {
  shrinked: boolean;
}

const initialState: SidebarState = {
  shrinked: false,
};

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggle: (state) => {
      state.shrinked = !state.shrinked;
    },
  },
});

export const { toggle } = sidebarSlice.actions;

export default sidebarSlice.reducer;
