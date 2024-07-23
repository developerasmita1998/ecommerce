import React, { useState } from "react";
import config from '../../utils/config';
import { useNavigate } from "react-router-dom";



const Contactus = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')

  const validate = () => {
    setError('')
    if (!name) {
      setError("Please enter your Name.");
      return false;
    }
    if (!phone) {
      setError("Please enter your phone number.");
      return false;
    }
    if (!email) {
      setError("Please enter your valid email address.");
      return false;
    }
    if (!subject) {
      setError("Please enter your subject.");
      return false;
    }
    if (!description) {
      setError("Please enter your description.");
      return false;
    }
    return true;

  }

  const handleSubmit = async () => {
    const temp = validate();
    if (temp) {
      let result = await fetch(config.addQuery, {
        method: 'post',
        body: JSON.stringify({ name, email, phone, subject, description }),
        headers: { 'Content-Type': 'application/json' }
      });
      let res = await result?.json();
      if (result?.status && result.status < 202) {
        navigate("/")
      } else {
        alert(res?.result.toString())
      }
    }
    else {
      setError('Please enter a name, email and subject')
    }
  }

  return (

    <div className="main_container">
      <div className="container_body">
        <div className="body_form_contactus">
          <h1 className="h1_tag">Contact Us</h1>

          <input type="text" value={name} placeholder=" Enter your Name"
            onChange={(e) => setName(e.target.value)} className="name" />

          <input type="number" value={phone} placeholder=" Enter your phone number"
            onChange={(e) => setPhone(e.target.value)} className="name" />


          <input type="email" value={email} placeholder="Enter a valid email"
            onChange={(e) => setEmail(e.target.value)} className="name" />
          <input type="text" value={subject} placeholder="Enter your subject"
            onChange={(e) => setSubject(e.target.value)} className="subject" />
          <input
            value={description}
            placeholder="Enter description"
            onChange={(e) => setDescription(e.target.value)}
            className="description" />
          <button className="button" onClick={handleSubmit}>SUBMIT</button>

          {error && <label>{error}</label>}


        </div>
      </div>
    </div>
  )

}

export default Contactus;