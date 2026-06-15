export default function ConfirmModal({
  open,
  title,
  message,
  onConfirm,
  onCancel,
}) {
  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>{title}</h3>

        <p>{message}</p>

        <div className="modal-actions">
          <button
            type="button"
            className="button button-secondary"
            onClick={onCancel}
          >
            Cancelar
          </button>

          <button
            type="button"
            className="button button-danger"
            onClick={onConfirm}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}