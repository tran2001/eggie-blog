import { configureStore } from "@reduxjs/toolkit";
import darkModeReducer from "../src/features/darkmode/darkMode";

export const store = configureStore({
  reducer: {
    darkState: darkModeReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
