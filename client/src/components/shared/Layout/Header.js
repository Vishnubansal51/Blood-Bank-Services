import React from "react";
import { BiSolidDonateBlood,BiSolidUserAccount } from "react-icons/bi";

import { useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom';

const Header = () => {
  const {user}= useSelector((state) =>state.auth);
  const navigate = useNavigate();
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
                <a className="nav-link active" aria-current="page" href="#">
                  {" "}
                  <BiSolidDonateBlood color="red" />
                  Blood Bank- Services
                </a>
              </li>
            </ul>
            <div className="nav-bar">
              <ul className="navbar-nav me-auto mb-2 my-1 mb-lg-0">
                <li className="nav-item mx-2" >
                  <a className="nav-link active"  aria-current="page" href="#">
                    {" "}
                    <BiSolidUserAccount  />
                    Welcome {user?.name || user?.hospitalName || user?.organisationName}
                    <span className="badge bg-secondary ms-1 ">{user?.role}</span>
                  </a>
                </li>
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
