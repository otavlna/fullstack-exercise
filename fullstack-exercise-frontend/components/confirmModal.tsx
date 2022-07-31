import { FunctionComponent } from "react";
import { Button, Modal } from "react-bootstrap";

interface ConfirmModalProps {
  onConfirm: () => void;
  onCancel: () => void;
  show: boolean;
  heading: JSX.Element | string;
  body: JSX.Element | string;
}

const ConfirmModal: FunctionComponent<ConfirmModalProps> = ({ onConfirm, onCancel, show, heading, body }) => {
  return (
    <>
      <Modal show={show} onHide={onCancel}>
        <Modal.Header closeButton>
          <Modal.Title>{heading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{body}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={onConfirm}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ConfirmModal;
