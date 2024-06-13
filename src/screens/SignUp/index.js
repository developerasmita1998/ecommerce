import React, { useState } from "react";
import "./../../App.css";
import myImg from "../../assets/1.jpg";
import { useNavigate } from "react-router-dom";
import config from "../../utils/config";

const SignUp = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [selectOptions, setSelectOptions] = useState("");
  const [date, setDate] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState("");

  const handleRadioChange = (e) => {
    setSelectOptions(e.target.value);
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const validate = () => {
    const firstNameRegex = /^[a-zA-Z]+$/;
    const lastNameRegex = /^[a-zA-Z]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^[0-9]{10}$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const addressRegex = /^.{10,}$/;
    const zipCodeRegex = /^[0-9]{6}$/;

    //1. All empty check , one by one------done
    //2.first name=> minimum 2 character needed =>error(minimum two character required)--
    //3. Last name should be same as first name.
    //4. special character not allow in first name and last name
    //5. add email regex else(Enter valid Email )
    // 6.  one option & dob should be selected either male or female---done.
    //7. mobile number should be 10 digit only valid error(Enter valid mobile number)
    //8. minimum eight  char, one capital and one small letter, one special character
    //and one digit, error(Enter valid password)
    // 9. minimum 10 character required, error(' minimum 10 character required')
    //1o. in  zip code, only 6 digit should be allowed, error(' only 6 digit should be allowed')

    setError("");
    if (!firstName) {
      setError("please enter First Name");
      return false;
    }
    if (!firstNameRegex.test(firstName)) {
      setError(
        "First Name should contain only alphabetic characters and be at least 2 characters long."
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
    if (!emailRegex.test(email)) {
      setError("Please enter a valid Email.");
      return false;
    }

    if (!selectOptions) {
      setError("please select one option ");
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

    if (!isChecked) {
      setError("please check one option!");
      return false;
    }

    return true;
  };

  const SignUpClicked = async () => {
    const temp = validate();
    if (temp) {
      try {
        let url = config.register;
        let options = {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            email: email,
            mobile: mobile,
            password: password,
            gender: selectOptions === "option1" ? "male" : "female",
            dateOfBirth: date,
            address: address,
            zipcode: zipCode,
          }),
        };
        
        const response = await fetch(url, options);
        if (!response.ok) {
          setError("Network response was not ok");
        }
        const data = await response.json();
        navigate("/Login");
      } catch (error) {
        setError(error.message);
      }
    }
  };

  return (
    <div className="container">
      <header className="header">
        <div className="myImage">
          <img src={myImg} className="image" />
        </div>

        <div className="sign_login">
          <label className="sign">SignUp</label>

          <label className="login">Login</label>
        </div>
      </header>

      <body className="body">
        <div className="register">
          <h1>Register</h1>
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
          <div className="checkbox">
            <label>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
              I am agree to the terms and condition
            </label>
          </div>
          <div>
            <button className="button_signUp" onClick={() => SignUpClicked()}>
              Sign Up
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

      <footer className="footer">
        <div className="footer1">E-Comm Dashboard</div>
      </footer>
    </div>
  );
};
export default SignUp;
