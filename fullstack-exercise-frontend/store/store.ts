import { configureStore } from "@reduxjs/toolkit";
import notificationsReducer from "../features/notifications/notificationsSlice";
import articlesReducer from "../features/articles/articlesSlice";
import fileUploadReducer from "../features/articles/fileUploadSlice";
import authReducer from "../features/auth/authSlice";
import commentsReducer from "../features/comments/commentsSlice";

export const store = configureStore({
  reducer: {
    notifications: notificationsReducer,
    articles: articlesReducer,
    fileUpload: fileUploadReducer,
    auth: authReducer,
    comments: commentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
