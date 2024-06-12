import React, { useEffect, useState } from "react";
import "../../App.css";
import myImg from "../../assets/1.jpg";
import { useNavigate } from "react-router-dom";
import config from "../../utils/config";

function ProductList() {
   const navigate = useNavigate();
  const [productData, setProductData] = useState([]);
  const [filterData, setFilterData] = useState([]);

  const [userData, setUserData] = useState([]);

  const [error, setError] = useState("");

  const [searchProduct, setSearchProduct] = useState("");


  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    setError("");
    try {
      const temp = JSON.parse(localStorage.getItem("data"));
      setUserData(temp?.user);
      let url = config.productList;
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
      setProductData(data);
      setFilterData(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const onChangeSearch = (e) => {
    setSearchProduct(e.target.value);

    const filteredData = productData.length > 0 && productData.filter((item) =>
      item.name.toLowerCase().includes(e.target.value.toLowerCase())
    );

    setFilterData(filteredData);
  };

  return (
    <div>

      <div className="container">
        <header className="headerProductList">
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

        <body className="body1">
          <div className="body_b">
            <h3 onClick={()=>navigate('/addProduct')} className="heading_addProduct">Product List</h3>
            <div className="input_div">
              {" "}
              <input
                type="text"
                onChange={(e) => onChangeSearch(e)}
                value={searchProduct}
                placeholder="Search Product"
                className="input1"
              />
            </div>

            <div className="center-col">
              <table>
                <tr>
                  <td>S.NO.</td>
                  <td>Name</td>
                  <td>Price</td>
                  <td>Category</td>
                  <td>Operation</td>
                </tr>

                {filterData.length > 0 ? (
                  filterData.map((item, ind) => (
                    <tr>
                      <td>{ind + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.price}</td>
                      <td>{item.category}</td>
                      <td>
                        <button>Delete</button>
                        <button className="update">Update</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <p>{"No data found"}</p>
                )}
              </table>

              {error &&<div> <p>{error}</p></div>}

            </div>
          </div>
        </body>

        <footer className="footer">
          <div className="footer1">E-Comm Dashboard</div>
        </footer>
      </div>
    </div>
  );
}

export default ProductList;
