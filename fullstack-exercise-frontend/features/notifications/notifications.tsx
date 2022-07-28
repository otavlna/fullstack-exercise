import { FunctionComponent } from "react";
import { ToastContainer } from "react-bootstrap";
import Toast from "react-bootstrap/Toast";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { removeNotification } from "./notificationsSlice";

interface NotificationsProps {}

const Notifications: FunctionComponent<NotificationsProps> = () => {
  const notifications = useAppSelector((state) => state.notifications.notifications);
  const dispatch = useAppDispatch();

  return (
    <ToastContainer position="top-center" className="mt-2">
      {notifications.map((notification) => (
        <Toast
          key={notification.id}
          bg={getBackground(notification.statusCode)}
          onClose={() => dispatch(removeNotification({ id: notification.id }))}
          show={notification.show}
          delay={5000}
          autohide
        >
          <Toast.Body>{notification.content}</Toast.Body>
        </Toast>
      ))}
    </ToastContainer>
  );

  function getBackground(statusCode: number) {
    if (statusCode >= 200 && statusCode < 300) return "success";
    else return "danger";
  }
};

export default Notifications;
