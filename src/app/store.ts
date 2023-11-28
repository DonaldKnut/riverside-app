import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/AuthSlice";
import { meetingsSlice } from "./slices/MeetingSlice";

// Assuming authSlice has an initialState property
const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    meetings: meetingsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store; // Export the store directly
