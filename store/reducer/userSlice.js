import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ROLES } from "../../constants/roles";

const initialState = {
  id: null,
  identification: null,
  firstName: null,
  lastName: null,
  role: ROLES.DESCONECTADO
}

export const getDataUser = createAsyncThunk('user/getData', async ()=>{
  // const response = axios
})

export const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    addDataUser: (state, action) => {
      state = action.payload
    },
    deleteDataUser: (state) => {
      state = initialState
    }
  }
});

export const { addDataUser, deleteDataUser } = userSlice.actions;

export default userSlice.reducer;