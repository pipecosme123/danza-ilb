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
    startLoading: ({ loading }) => {
      loading = true
    },
    stopLoading: ({ loading }) => {
      loading = false
    },
    showAlert: ({ alert }, { payload }) => {
      alert.status = payload.status;
      alert.message = payload.message;
    },
    hiddenAlert: ({ alert }) => {
      alert.status = initialState.alert.status;
      alert.message = initialState.alert.message;
    }
  }
})

export const { startLoading, stopLoading, showAlert, hiddenAlert } = systemSlice.actions;

export default systemSlice.reducer;