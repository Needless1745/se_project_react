import "./SideBar.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";

export default function SideBar({ onEditProfileClick, onSignOut }) {
  const currentUser = useContext(CurrentUserContext);
  const userInitial = currentUser?.name?.[0]?.toUpperCase();

  return (
    <aside className="sidebar">
      <div className="sidebar__user-container">
        {currentUser?.avatar ? (
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="sidebar__avatar"
          />
        ) : (
          <div className="sidebar__avatar-placeholder">{userInitial}</div>
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
