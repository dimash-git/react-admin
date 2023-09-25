import { createSlice } from "@reduxjs/toolkit";

interface ModalDeleteState {
  what: string;
  id: string;
  apiUrl: string;
  mess: {
    error: string;
    success: string;
  };
  open: boolean;
}

const initialState: ModalDeleteState = {
  what: "",
  id: "",
  apiUrl: "",
  mess: {
    error: "",
    success: "",
  },
  open: false,
};

export const modalDeleteSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setInfo: (state, action) => {
      Object.assign(state, action.payload);
    },
    setOpen: (state) => {
      state.open = !state.open;
    },
  },
});

export const { setInfo, setOpen } = modalDeleteSlice.actions;

export default modalDeleteSlice.reducer;
