import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SocketState {
  
}

const initialState: SocketState = {

};

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
  },
});

export const {  } = socketSlice.actions;
export default socketSlice.reducer;