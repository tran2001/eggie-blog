import { configureStore } from "@reduxjs/toolkit";
import darkModeReducer from "../src/features/darkMode";
import authReducer from "../src/features/auth";
import { setupListeners } from "@reduxjs/toolkit/query";
import { blogApi } from "@/api/blog";

export const store = configureStore({
  reducer: {
    darkState: darkModeReducer,
    [blogApi.reducerPath]: blogApi.reducer,
    authState: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(blogApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);
