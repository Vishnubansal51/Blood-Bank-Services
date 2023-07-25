import React from "react";
// import { userMenu } from './Menus/userMenu'
import { useLocation, Link } from "react-router-dom";
import "../../../styles/layout.css";
import { useSelector } from "react-redux";
const Sidebar = () => {
  const location = useLocation();

  // geting user
  const { user } = useSelector((state) => state.auth);
  return (
    <div>
      <div className="sidebar">
        <div className="menu">
          {/* {userMenu.map((menu) => {
            const isActive = location.pathname === menu.path;
            return (
              <div
                className={`menu-item ${isActive && "active"}`}
                key={menu.name}
              >
                <i className={menu.icon}></i>
                <Link to={menu.path}>{menu.name}</Link>
              </div>
            );
          })} */}
          {user?.role === "organisation" && (
            <>
              <div
                className={`menu-item ${location.pathname === "/" && "active"}`}
              >
                <i className="fa-solid fa-warehouse"></i>
                <Link to="/">Inventory</Link>
              </div>

              <div
                className={`menu-item ${
                  location.pathname === "/donar" && "active"
                }`}
              >
                <i className="fa-solid fa-hand-holding-medical"></i>
                <Link to="/donar">Donar</Link>
              </div>
              <div
                className={`menu-item ${
                  location.pathname === "/hospital" && "active"
                }`}
              >
                <i className="fa-regular fa-hospital"></i>
                <Link to="/hospital">Hospital </Link>
              </div>
            </>
          )}
          {user?.role === "admin" && (
            <>
              <div
                className={`menu-item ${
                  location.pathname === "/donar-list" && "active"
                }`}
              >
                <i className="fa-solid fa-warehouse"></i>
                <Link to="/donar-list">Donars List</Link>
              </div>

              <div
                className={`menu-item ${
                  location.pathname === "/hospital-list" && "active"
                }`}
              >
                <i className="fa-solid fa-hand-holding-medical"></i>
                <Link to="/hospital-list">Hospital List</Link>
              </div>
              <div
                className={`menu-item ${
                  location.pathname === "/org-list" && "active"
                }`}
              >
                <i className="fa-regular fa-hospital"></i>
                <Link to="/org-list">Organisation List </Link>
              </div>
            </>
          )}
          {(user?.role === "donar" || user?.role === "hospital") && (
            <div
              className={`menu-item ${
                location.pathname === "/organisation" && "active"
              }`}
            >
              <i className="fa-solid fa-sitemap"></i>
              <Link to="/organisation">Organisation</Link>
            </div>
          )}
          {user?.role === "hospital" && (
            <div
              className={`menu-item ${
                location.pathname === "/consumer" && "active"
              }`}
            >
              <i className="fa-solid fa-republican"></i>
              <Link to="/consumer">Consumer</Link>
            </div>
          )}
          {user?.role === "donar" && (
            <div
              className={`menu-item ${
                location.pathname === "/donation" && "active"
              }`}
            >
              <i className="fa-solid fa-republican"></i>
              <Link to="/donation">Donation</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
