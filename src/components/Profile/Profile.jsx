import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";

export default function Profile({
  clothingItems,
  handleCardClick,
  onAddClick,
  onCardLike,
  onEditProfileClick,
  onSignOut,
  fallbacKAvatar,
}) {
  return (
    <section className="profile">
      <SideBar onEditProfileClick={onEditProfileClick} onSignOut={onSignOut} />
      <ClothesSection
        handleCardClick={handleCardClick}
        clothingItems={clothingItems}
        onAddClick={onAddClick}
        onCardLike={onCardLike}
        onError={fallbacKAvatar}
      />
    </section>
  );
}
