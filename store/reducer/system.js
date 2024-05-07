import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  alert: {
    status: null,
    message: null
  }
}

export const systemSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true
    },
    stopLoading: (state) => {
      state.loading = false
    },
    showAlert: (state, action) => {
      state.alert.status = action.payload.status;
      state.alert.message = action.payload.message;
    },
    hiddenAlert: (state) => {
      state.alert.status = initialState.alert.status;
      state.alert.message = initialState.alert.message;
    }
  }
})

export const { startLoading, stopLoading, showAlert, hiddenAlert } = systemSlice.actions;

export default systemSlice.reducer;