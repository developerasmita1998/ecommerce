import { useContext, useEffect, useState } from "react";
import "../../App.css";
import myImg from "../../assets/1.jpg";
import { useNavigate } from "react-router-dom";
import config from "../../utils/config";

function Login() {
  const navigate = useNavigate();

  const [loginDataStore, setLoginDataStore] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  // useEffect(() => {
  //   const temp = JSON.parse(localStorage.getItem("data"));
  //   if(temp?.user)navigate('/')
  // }, []);

  const login = async () => {
    if (!email) {
      setError("please enter email");
      return false;
    }
    if (!password) {
      setError("please enter password");
      return false;
    }
    setError("");
    try {
      let url = config.login;
      let options = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      };
      const response = await fetch(url, options);
      if (!response.ok) {
        setError("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
      
      if (data && data?.auth) {      
        setLoginDataStore(data);
        localStorage.setItem("data", JSON.stringify(data));
        navigate("/");
      } else {
        if(data?.result){
          setError(data?.result);
        }else{
           setError(data);
        }
     
        setLoginDataStore([]);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container">
      <div className="body_form">
        <h2>Login</h2>

        <div>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            value={email}
          />
        </div>

        <div>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            value={password}
          />
        </div>

        <div>
          <button onClick={login} className="button">
            Login
          </button>
          <div>{error && <p style={{ color: "red" }}>{error}</p>}</div>
        </div>
      </div>
    </div>
  );
}

export default Login;
