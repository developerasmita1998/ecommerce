import React, { useEffect, useState } from "react";
import "../../App.css";
import myImg from "../../assets/1.jpg";

const Profile = () => {
  const [error, setError] = useState("");

  const [photo, setPhoto] = useState(null);
  const [userData, setUserData] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [selectOptions, setSelectOptions] = useState("");
  const [date, setDate] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");

  const handleRadioChange = (e) => {
    setSelectOptions(e.target.value);
  };

  const updateProfile = () => {
    const firstNameRegex = /^[a-zA-Z]+$/;
    const lastNameRegex = /^[a-zA-Z]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^[0-9]{10}$/;
    const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const addressRegex = /^.{10,}$/;
    const zipCodeRegex = /^[0-9]{6}$/;

   setError("");
    if(!photo){
        setError('Please choose photo');
        return false;
    }
    if(!firstName){
        setError('Please enter first name');
        return false;
    }
    if (!firstNameRegex.test(firstName)) {
        setError(
          "First Name should contain only alphabetic characters"
        );
        return false;
      }
      if (firstName.length < 2) {
        setError("First Name should be at least 2 characters long.");
        return false;
      }
      if (!lastName) {
        setError("please enter Last Name");
        return false;
      }
      if (!lastNameRegex.test(lastName)) {
        setError("Last Name should contain only alphabetic characters.");
        return false;
      }
      if (lastName.length < 2) {
        setError("Last Name should be at least 2 characters long.");
        return false;
      }
      if (!email) {
        setError("please enter Email");
        return false;
     }
      if (!date) {
        setError("please enter date of birth");
        return false;
      }

      if (!mobile) {
        setError("please enter mobile number");
        return false;
      }
      if (!mobileRegex.test(mobile)) {
        setError("Mobile Number should be 10 digits long.");
        return false;
      }
      if (!password) {
        setError("please enter password");
        return false;
      }
      if (!passwordRegex.test(password)) {
        setError(
          "Password should be at least 8 characters long, with one capital letter, one small letter, one special character, and one digit."
        );
        return false;
      }
      if (!address) {
        setError("please enter Address");
        return false;
      }
      if (!addressRegex.test(address)) {
        setError("Address should be at least 10 characters long.");
        return false;
      }
      if (!zipCode) {
        setError("please enter ZipCode");
        return false;
      }
      if (!zipCodeRegex.test(zipCode)) {
        setError("Zip Code should be 6 digits long.");
        return false;
      }
     return true;
};

  return (
    <div className="container">
      <header className="header">
        <div className="myImage">
          <img src={myImg} className="image" />
        </div>
        <div>
          <label className="navLabel">Products</label>
          <label className="navLabel">Add Products</label>
          <label className="navLabel">Profile</label>
          <label className="navLabel">Logout ({userData?.firstName})</label>
        </div>
      </header>

      <body className="body">
        <div className="register">
          <h1>Update Profile</h1>
          <div>
            <input
              type="file"
              onChange={(e) => setPhoto(e.target.files[0])}
              className="input_signUp"
            />
            {photo && (
              <img
                width={"20px"}
                height={"20px"}
                src={URL.createObjectURL(photo)}
              />
            )}
          </div>
          <div>
            <input
              type="text"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              placeholder="Enter First Name"
              className="input_signUp"
            />
          </div>
          <div>
            <input
              type="text"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              placeholder="Enter Last Name"
              className="input_signUp"
            />
          </div>

          <div>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Enter Email"
              className="input_signUp"
            />
          </div>

          <div className="input_signUp_fieldset">
            <fieldset>
              <label>
                Gender:
                <input
                  type="radio"
                  value="option1"
                  checked={selectOptions === "option1"}
                  onChange={handleRadioChange}
                />
              </label>
              <label>
                Male
                <input
                  type="radio"
                  value="option2"
                  checked={selectOptions === "option2"}
                  onChange={handleRadioChange}
                />
              </label>
              <label>Female</label>
            </fieldset>
          </div>

          <div className="input_signUp">
            <label>
              Date of Birth:
              <input
                type="date"
                onChange={(e) => setDate(e.target.value)}
                value={date}
                className="dob"
              />
            </label>
          </div>
          <div>
            <input
              type="number"
              onChange={(e) => setMobile(e.target.value)}
              value={mobile}
              placeholder="Enter Mobile"
              className="input_signUp"
            />
          </div>
          <div>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Enter Password"
              className="input_signUp"
            />
          </div>
          <div>
            <input
              type="text"
              onChange={(e) => setAddress(e.target.value)}
              value={address}
              placeholder="Enter Address"
              className="input_signUp"
            />
          </div>

          <div>
            <input
              type="text"
              onChange={(e) => setZipCode(e.target.value)}
              value={zipCode}
              placeholder="Enter ZipCode"
              className="input_signUp"
            />
          </div>
          <div>
            <button className="button_signUp" onClick={() => updateProfile()}>
              Update
            </button>
            {error && (
              <div>
                {" "}
                <label>{error}</label>{" "}
              </div>
            )}
          </div>
        </div>
      </body>

      <footer className="footer"></footer>
      <div className="footer1">E-Comm Dashboard</div>
    </div>
  );
};
export default Profile;
