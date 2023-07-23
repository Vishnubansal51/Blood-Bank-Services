import React from "react";
import { BiSolidDonateBlood,BiSolidUserAccount } from "react-icons/bi";

import { useSelector } from 'react-redux';
import {useNavigate,useLocation,Link} from 'react-router-dom';

const Header = () => {
  const {user}= useSelector((state) =>state.auth);
  const navigate = useNavigate();
  const location = useLocation()
  // logout handler
  const handleLogout =()=>{
    localStorage.clear()
    alert('Logout Sucessfully')
    navigate('/login');
  }
  return (
    <>
      <nav className=" all navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          {/* <a className="navbar-brand" href="#"></a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button> */}
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active action" aria-current="page" to="#">
                  {" "}
                  <BiSolidDonateBlood color="red" />
                  Blood Bank- Services
                </Link>
              </li>
            </ul>
            <div className="nav-bar">
              <ul className="navbar-nav me-auto mb-2 my-1 mb-lg-0">
                <li className="nav-item mx-2" >
                  <Link className="nav-link active action"  aria-current="page" to="#">
                    {" "}
                    <BiSolidUserAccount  />
                    Welcome {user?.name || user?.hospitalName || user?.organisationName}
                    <span className="badge bg-secondary ms-1 ">{user?.role}</span>
                  </Link>
                </li>
                {
                  (location.pathname === '/' || location.pathname === '/donar' || location.pathname === '/hospital') ? (
                    <li className="nav-item mx-2" >
                  <Link className="nav-link active action"  aria-current="page" to="/analytics">
                      Analytics 
                  </Link>
                    </li>
                  ) :(
                    <li className="nav-item mx-2" >
                  <Link className="nav-link active action"  aria-current="page" to="/">
                      Home
                  </Link>
                  </li>
                )}

                <li>
                  <button className="btn btn-outline-success mx-3" onClick={handleLogout}>
                    LogOut
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
