import { configureStore } from '@reduxjs/toolkit';
import socketReducer from './reducers/socketReducer';
export default configureStore({
  reducer: {
    socket: socketReducer,
  },
});
