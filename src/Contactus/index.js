  import React, { useState } from "react";
    const Contactus =() =>{
    const [contactData,setContactData] = useState([])
    const [name,setName]= useState('')
    const [mobile,setMobile] = useState('')
    const [email,setEmail] = useState('')
    const [subject,setSubject] = useState('')
    const [description,setDescription] = useState('')
    const [error,setError] = useState('')
    
    const validate = ()=>{
          setError('')
          if (!name) {
            setError("Please enter your Name.");
            return false;
          }
          if (!mobile) {
            setError("Please enter your mobile number.");
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
          alert("All good");
            return true;
        
    }
  return(

    <div className="main_container">
       <div className="container_body">
        <div className="body_form_contactus">
            <h1 className="h1_tag">Contact Us</h1>

        <input type="text" value={name} placeholder=" Enter your Name" 
        onChange={(e)=>setName(e.target.value)} className="name"/>

        <input type="number" value={mobile} placeholder=" Enter your mobile number" 
        onChange={(e)=>setMobile(e.target.value)} className="name"/>


        <input type="email" value={email}    placeholder="Enter a valid email" 
             onChange={(e)=>setEmail(e.target.value)} className="name"/>
        <input type="text" value={subject} placeholder="Enter your subject" 
        onChange={(e)=>setSubject(e.target.value)} className="subject"/>
        <input 
         value={description} 
         placeholder="Enter description" 
         onChange={(e) => setDescription(e.target.value)} 
        className="description"/>
       <button className="button" onClick={validate}>SUBMIT</button>
         
       {error&& <label>{error}</label>}


    </div>
    </div>
    </div>
)

}
export default Contactus;