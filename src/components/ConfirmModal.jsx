import Modal from "./Modal.jsx";

export default function ConfirmModal({ title, message, confirmLabel = "Hapus", onConfirm, onClose }) {
  return (
    <Modal title={title} onClose={onClose} small floating>
      <p className="confirm-text">{message}</p>
      <div className="row modal-actions">
        <button className="btn btn-soft" onClick={onClose}>Batal</button>
        <button
          className="btn btn-primary"
          onClick={() => {
            onConfirm();
            onClose();
          }}
        >
          {confirmLabel}
        </button>
      </div>
    </Modal>
  );
}
