import React, { useEffect, useState } from "react";
import "../../App.css";
import myImg from "../../assets/1.jpg";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import config from "../../utils/config";

const UpdateProduct = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [error, setError] = useState("");
  //local storage se data le userData me setUserData function se dala hai.
  const [userData, setUserData] = useState([]);
  //fields
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productCompany, setProductCompany] = useState("");

  useEffect(() => {
    const temp = JSON.parse(localStorage.getItem("data"));
    setUserData(temp?.user);
    getProductDetailWithId();
  }, []);


  const getProductDetailWithId = async() =>
    {
      setError("");
      try {
        const temp = JSON.parse(localStorage.getItem("data"));
        const  url = config.userDetail + temp?.result?.id;
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
      console.log(data)

      if (data) {
        setProductName(data.name);
        setProductPrice(data.price);
        setProductCategory(data.category);
        setProductCompany(data.company);
    }else{
      setError(data.result);
    }
    } catch (error) {
      setError(error.message);
    }
  }


  const validate = () => {
    const productNameRegex = /^[a-zA-Z]{2,}$/;
    const productPriceRegex = /^[0-9]+(\.[0-9]{1,2})?$/;
    const productCategoryRegex = /^[a-zA-Z]{2,}$/;
    const productCompanyRegex = /^[a-zA-Z]{2,}$/;

    setError("");

    if (!productName) {
      setError("Please enter Product Name.");
      return false;
    }
    if (!productNameRegex.test(productName)) {
      setError(
        "Product Name should be at least 2 characters long and contain only letters."
      );
      return false;
    }

    if (!productPrice) {
      setError("Please enter Product Price.");
      return false;
    }
    if (!productPriceRegex.test(productPrice)) {
      setError("Price should be a valid number with up to two decimal places.");
      return false;
    }
    if (parseFloat(productPrice) <= 0) {
      setError("Price should be greater than 0.");
      return false;
    }

    if (!productCategory) {
      setError("Please enter Product Category.");
      return false;
    }
    if (!productCategoryRegex.test(productCategory)) {
      setError(
        "Product Category should be at least 2 characters long and contain only letters."
      );
      return false;
    }

    if (!productCompany) {
      setError("Please enter Product Company.");
      return false;
    }
    if (!productCompanyRegex.test(productCompany)) {
      setError(
        "Product Company should be at least 2 characters long and contain only letters."
      );
      return false;
    }

    return true;
  };

  const handleUpdateProduct = async() => {
    const temp = validate();
    const user = JSON.parse(localStorage.getItem("data"));
     if(temp){
     try{
        const  url = config.getProductDetail + id;

      let options = {
        method: "PUT",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization: `Bearer ${user?.auth}`,
        },
        body: JSON.stringify({
            name:productName,
            price:productPrice,
            category:productCategory,
            company:productCompany,
            userId:userData?._id
        })};

        const response = await fetch(url, options);
        if(!response.ok){
            setError("Response was not ok");
        }
        const data = await response.json();
        if (data && data?.result) {
            setError(data.result);
          } else {
            navigate('/')
          }

     }
     catch(error){
        setError(error.message)
     }
     }
  };

  //Name =>Empty,two char
  //Price=>Empty,digit,>0
  //Category same as name
  //Company same as name

  return (
    <div>
      <div className="container">
 
          <div className="input_div">
            <h1>Update Product</h1>
            <div>
              <input
                type="text"
                onChange={(e) => setProductName(e.target.value)}
                value={productName}
                placeholder="Enter product name"
                className="input3"
              />
            </div>
            <div>
              <input
                type="text"
                onChange={(e) => setProductPrice(e.target.value)}
                value={productPrice}
                placeholder="Enter product price"
                className="input3"
              />
            </div>
            <div>
              <input
                type="text"
                onChange={(e) => setProductCategory(e.target.value)}
                value={productCategory}
                placeholder="Enter product Category"
                className="input3"
              />
            </div>
            <div>
              <input
                type="text"
                onChange={(e) => setProductCompany(e.target.value)}
                value={productCompany}
                placeholder="Enter product company"
                className="input3"
              />
            </div>
            <button className="button1" onClick={handleUpdateProduct}>
              Submit
            </button>

            {error && <div><label>{error}</label> </div> }

          </div>
      
      </div>
    </div>
  );
};
export default UpdateProduct;
