import React, { useEffect, useState } from "react";
import "./../App.css";
import myImg from "../assets/1.jpg";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();
  const data = localStorage.getItem("data");

  let name;
  try {
    if (data) {
      name = JSON.parse(data)?.user?.firstName;
    }
  } catch (error) {
    console.log(error);
  }

  let profileImage;
  try {
    if (data) {
      profileImage = JSON.parse(data)?.user.profileImage;
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
          <img src={profileImage ? profileImage : myImg} className="navImage" />
        </div>

        {data && (
          <ul className="nav-ul">
            <li>
              <Link to="/">Products</Link>
            </li>
            <li>
              <Link to="/addProduct">Add Products</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
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
              <Link to="/signup">Sign Up </Link>
            </li>
            <li>
              <Link to="/login">Login </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Nav;
