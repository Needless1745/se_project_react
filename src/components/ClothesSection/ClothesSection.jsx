import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

export default function ClothesSection({
  clothingItems,
  handleCardClick,
  onAddClick,
}) {
  const currentUser = useContext(CurrentUserContext);

  const userItems = clothingItems.filter((item) => {
    const itemOwnerId =
      typeof item.owner === "object" ? item.owner._id : item?.owner;

    return itemOwnerId === currentUser?._id;
  });
  return (
    <div className="clothes-section">
      <div className="clothes-section__row">
        <p>Your Items</p>
        <button
          className="clothes-section__btn"
          type="button"
          onClick={onAddClick}
        >
          + Add new
        </button>
      </div>
      <ul className="clothes-section__items">
        {userItems.map((item) => (
          <ItemCard
            key={item._id ?? item.id}
            item={item}
            onCardClick={handleCardClick}
          />
        ))}
      </ul>
    </div>
  );
}
