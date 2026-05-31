import "./SideBar.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext, useState } from "react";

export default function SideBar({ onEditProfileClick, onSignOut }) {
  const currentUser = useContext(CurrentUserContext);
  const [avatarError, setAvatarError] = useState(false);
  const userInitial = currentUser?.name?.charAt(0)?.toUpperCase();
  const fallbackAvatar = !currentUser?.avatar || avatarError;

  return (
    <aside className="sidebar">
      <div className="sidebar__user-container">
        {fallbackAvatar ? (
          <div
            className=".sidebar__avatar-placeholder {
"
          >
            {userInitial}
          </div>
        ) : (
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="sidebar__avatar"
            onError={() => setAvatarError(true)}
          />
        )}

        <span className="sidebar__username">{currentUser?.name}</span>
      </div>

      <button
        type="button"
        className="sidebar__edit-profile"
        onClick={onEditProfileClick}
      >
        Change profile data
      </button>

      <button type="button" className="sidebar__sign-out" onClick={onSignOut}>
        Log out
      </button>
    </aside>
  );
}
