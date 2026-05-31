import "./Header.css";
import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import logo from "../../assets/logo.svg";

function Header({
  handleAddClick,
  weatherData,
  isLoggedIn,
  handleRegisterClick,
  handleLoginClick,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const currentUser = useContext(CurrentUserContext);
  const [avatarError, setAvatarError] = useState(false);
  const userInitial = currentUser?.name?.charAt(0)?.toUpperCase();
  const fallbackAvatar = !currentUser?.avatar || avatarError;

  return (
    <header className="header">
      <NavLink to="/">
        <img className="header__logo" src={logo} alt="WTWR logo" />
      </NavLink>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <div className="header__right">
        <ToggleSwitch />

        {isLoggedIn ? (
          <>
            <button
              onClick={handleAddClick}
              type="button"
              className="header__add-clothes-btn"
            >
              + Add clothes
            </button>

            <NavLink className="header__nav-link" to="/profile">
              <div className="header__user-container">
                <p className="header__username">{currentUser?.name}</p>
                {fallbackAvatar ? (
                  <div
                    className=".header__avatar-placeholder {
"
                  >
                    {userInitial}
                  </div>
                ) : (
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="header__avatar"
                    onError={() => setAvatarError(true)}
                  />
                )}
              </div>
            </NavLink>
          </>
        ) : (
          <>
            <button
              type="button"
              className="header__auth-btn"
              onClick={handleRegisterClick}
            >
              Sign up
            </button>

            <button
              type="button"
              className="header__auth-btn"
              onClick={handleLoginClick}
            >
              Log in
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
