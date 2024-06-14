import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../../App.css";
import myImg from "../../assets/1.jpg";
import config from "../../utils/config";

const Profile = () => {
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const [photo, setPhoto] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("asmita@gmail.com");
  const [selectOptions, setSelectOptions] = useState("");
  const [date, setDate] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");

  useEffect(() => {
    getUserDetailApi();
  }, []);

  const getUserDetailApi = async () => {
    setError("");
    try {
      const temp = JSON.parse(localStorage.getItem("data"));
      const url = config.userDetail + temp?.result?._id;
      let options = {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${temp?.auth}`,
        },
      };
      const response = await fetch(url, options);
      if (!response.ok) {
        setError("Response was not ok");
      }
      const data = await response.json();
      console.log(data);

      if (data) {
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setEmail(data.email);
        setSelectOptions(data.gender === "male" ? "option1" : "option2");
        setDate(data.dateOfBirth);
        setMobile(data.mobile);
        setAddress(data.address);
        setZipCode(data.zipcode);
        setProfileImage(data.profileImage);
      } else {
        setError(data.result);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleRadioChange = (e) => {
    setSelectOptions(e.target.value);
  };

  const validate = () => {
    const firstNameRegex = /^[a-zA-Z]+$/;
    const lastNameRegex = /^[a-zA-Z]+$/;
    const mobileRegex = /^[0-9]{10}$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const addressRegex = /^.{10,}$/;
    const zipCodeRegex = /^[0-9]{6}$/;

    setError("");
    if (!photo && !profileImage) {
      setError("Please choose photo");
      return false;
    }
    if (!firstName) {
      setError("Please enter first name");
      return false;
    }
    if (!firstNameRegex.test(firstName)) {
      setError("First Name should contain only alphabetic characters");
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

  const updateProfile = async () => {
    const validated = validate();
    if (validated) {
      try {
        const temp = JSON.parse(localStorage.getItem("data"));
        let token = temp?.auth;
        let userID = temp?.result?._id;

        const formData = new FormData();
        if (photo) {
          formData.append("profileImage", photo);
        }
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        formData.append(
          "gender",
          selectOptions === "option1" ? "male" : "female"
        );
        formData.append("dateOfBirth", date);
        formData.append("mobile", mobile);
        formData.append("address", address);
        formData.append("zipcode", zipCode);

        const url = config.updateUser + userID;

        let options = {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        };
        const response = await fetch(url, options);
        if (!response.ok) {
          setError("Network response was not ok");
        }
        const data = await response.json();
        if (data && data?.result) {
          localStorage.setItem("data", JSON.stringify(data));
          navigate("/");
        } else {
          setError(data?.message);
        }
      } catch (error) {
        setError(error.message);
      }
    }
  };

  return (
    <div className="container">
      <div className="register">
        <h1>Update Profile</h1>
        <div>
          <input
            type="file"
            onChange={(e) => setPhoto(e.target.files[0])}
            className="input_signUp"
          />
          {photo ? (
            <img
              width={"20px"}
              height={"20px"}
              src={photo ? URL.createObjectURL(photo) : null}
            />
          ) : (
            <img
              width={"20px"}
              height={"20px"}
              src={profileImage ? profileImage : null}
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
            value={email}
            disabled
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
    </div>
  );
};
export default Profile;
