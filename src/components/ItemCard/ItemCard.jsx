import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

import "./ItemCard.css";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const handleCardClick = () => {
    onCardClick(item);
  };

  const itemLikes = item.likes || [];

  const isLiked = itemLikes.some((user) => {
    const userId = typeof user === "object" ? user._id : user;
    return userId === currentUser?._id;
  });

  const itemLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_active" : ""
  }`;

  const handleLike = () => {
    onCardLike({ ...item, isLiked });
  };

  return (
    <li className="card">
      <div className="card__header">
        <h2 className="card__name">{item.name}</h2>
        {currentUser && (
          <button
            type="button"
            className={itemLikeButtonClassName}
            onClick={handleLike}
            aria-label={isLiked ? "unlike item" : "Like item"}
          />
        )}
      </div>

      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
