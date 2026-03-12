import "./SideBar.css";
import avatar from "../../assets/avatar.png";

export default function SideBar() {
  const username = "Terrence Tegegne";

  return (
    <aside className="sidebar">
      <div className="sidebar__user-container">
        <img src={avatar} alt="Terrence Tegegne" className="sidebar__avatar" />
        <p className="sidebar__username">{username}</p>
      </div>
    </aside>
  );
}
