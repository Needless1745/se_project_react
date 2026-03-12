import "./ItemModal.css";
import closeIcon from "../../assets/itemModal__exit.png";

function ItemModal({ activeModal, onClose, card, onDeleteClick }) {
  const handleDeleteClick = () => {
    if (onDeleteClick) {
      onDeleteClick(card);
    }
  };
  return (
    <div
      className={`modal ${activeModal === "preview" ? "modal__opened" : ""}`}
    >
      <div className="modal__content modal__content_type_image">
        <button
          type="button"
          className="modal__close_type_preview"
          onClick={onClose}
          aria-label="Close"
        ></button>
        <img
          src={card?.imageUrl || card?.link}
          alt={card?.name}
          className="modal__image"
        />

        <div className="modal__footer">
          <div className="modal__info">
            <h2 className="modal__caption">{card?.name}</h2>
            <p className="modal__weather">Weather: {card?.weather}</p>
          </div>
          <button
            type="button"
            className="modal__delete-btn"
            onClick={handleDeleteClick}
          >
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
