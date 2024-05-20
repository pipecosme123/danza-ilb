import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ROLES } from "../../constants";

const initialState = {
  id: null,
  username: null,
  identification: null,
  firstName: null,
  lastName: null,
  role: ROLES.DESCONECTADO
}

export const getDataUser = createAsyncThunk('user/getData', async () => {
  // const response = axios
})

export const users = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    addDataUser: (state, action) => {
      state = action.payload
    },
    deleteDataUser: (state) => {
      state = initialState
    },
    setUsername: (state, action) => {
      state.username = action.payload.username
    },
  }
});

export const { addDataUser, deleteDataUser, setUsername } = users.actions;

export default users.reducer;