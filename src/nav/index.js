import React, { useEffect, useState } from "react";
import "./../App.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import config from "../utils/config";

const Nav = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const checkPath = (path) => {
    return pathname.includes(path);
  };

  const data = localStorage.getItem("data");

  let name;
  try {
    if (data) {
      name = JSON.parse(data)?.result?.firstName;
    }
  } catch (error) {
    console.log(error);
  }

  let profileImage;
  try {
    if (data) {
      profileImage = JSON.parse(data)?.result?.profileImage;
    }
  } catch (error) {
    console.log(error);
  }

  const logOut = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="navHeader">
      <div className="leftRightDiv">
        <div className="myImage">
          <img src={profileImage ? profileImage : config.dummy} className="navImage" />
        </div>

        {data && data !== '' && (
          <ul className="nav-ul">
            <li>
              <Link lassName={pathname === '/' ? 'nav-link' : ''} to="/">Products</Link>
            </li>
            <li>
              <Link className={checkPath('/addProduct') ? 'nav-link' : ''} to="/addProduct">Add Products</Link>
            </li>
            <li>
              <Link className={checkPath('/profile') ? 'nav-link' : ''} to="/profile">Profile</Link>
            </li>
            <li>
              <Link onClick={logOut} to="/login">
                Logout ({name})
              </Link>
            </li>
          </ul>
        )}
      </div>
      {!data && (
        <div className="leftRightDiv">
          <ul className="nav-ul">
            <li>
              <Link className={checkPath('/signup') ? 'nav-link' : ''} to="/signup">Sign Up </Link>
            </li>
            <li>
              <Link className={checkPath('/login') ? 'nav-link' : ''} to="/login">Login </Link>
            </li>
            <li>
              <Link className={checkPath('/Contactus') ? 'nav-link' : ''} to="/Contactus">Contact Us </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Nav;
