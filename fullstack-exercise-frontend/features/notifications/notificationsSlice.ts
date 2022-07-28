import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Notification } from "./notificationsTypes";
import { v4 as uuid } from "uuid"; //nanoid

interface NotificationsState {
  notifications: Notification[];
}

const initialState: NotificationsState = {
  notifications: [],
};

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications.push(action.payload);
    },
    removeNotification(state, action: PayloadAction<{ id: string }>) {
      state.notifications = state.notifications.filter(
        (notification: Notification) => notification.id !== action.payload.id
      );
    },
  },
});

export const { addNotification, removeNotification } = notificationsSlice.actions;

export default notificationsSlice.reducer;

export function createNotification(content: string, statusCode: number) {
  const notification: Notification = {
    content: content,
    statusCode: statusCode,
    show: true,
    id: uuid(),
  };

  return notification;
}
