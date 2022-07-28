import { configureStore } from "@reduxjs/toolkit";
import notificationsReducer from "../features/notifications/notificationsSlice";
import articlesReducer from "../features/articles/articlesSlice";
import articleReducer from "../features/articles/articleSlice";

export const store = configureStore({
  reducer: { notifications: notificationsReducer, articles: articlesReducer, article: articleReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
