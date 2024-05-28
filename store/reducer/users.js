import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ROLES } from "../../constants";

const initialState = {
  id: null,
  username: null,
  name: null,
  lastName: null,
  role: ROLES.DESCONECTADO
}

export const users = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    addDataUser: (state, action) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.name = action.payload.name;
      state.lastName = action.payload.lastName;
      state.role = action.payload.role;
    },
    deleteDataUser: (state) => {
      state.id = null;
      state.username = null;
      state.name = null;
      state.lastName = null;
      state.role = ROLES.DESCONECTADO;
    },
    setUsername: (state, action) => {
      state.username = action.payload.username
    }
  }
});

export const { addDataUser, deleteDataUser, setUsername } = users.actions;

export default users.reducer;