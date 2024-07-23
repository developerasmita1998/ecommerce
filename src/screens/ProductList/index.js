import React, { useEffect, useState } from "react";
import "../../App.css";
import { useNavigate } from "react-router-dom";
import config from "../../utils/config";

function ProductList() {
  const navigate = useNavigate();
  const [productData, setProductData] = useState([]);
  const [filterData, setFilterData] = useState([]);


  const [error, setError] = useState("");

  const [searchProduct, setSearchProduct] = useState("");

  useEffect(() => {
    const temp = JSON.parse(localStorage.getItem("data"));
    if (!temp?.auth) navigate('/login');
    else getList();
  }, []);

  const logout = () => {
    localStorage.clear();
    alert('Unauthorized')
    navigate('/login')
  }

  const getList = async () => {
    setError("");
    try {
      const temp = JSON.parse(localStorage.getItem("data"));
      let url = config.productList;
      let options = {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${temp?.auth}`,
        }
      };
      const response = await fetch(url, options);
      if (!response.ok) {
        // Handle server errors
        if (response.status === 404) {
          throw new Error('Resource not found');
        } else if (response.status === 401) {
          logout()
        } else if (response.status === 500) {
          throw new Error('Internal Server Error');
        } else {
          throw new Error('Failed to fetch data');
        }
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

    const filteredData = productData.length > 0 &&
      productData.filter((item) => {
        const name = item?.name;
        return typeof name === 'string' && name.toLowerCase().includes(e.target.value.toLowerCase());
      });

    setFilterData(filteredData);
  };

  // const deleteProduct =async(id) =>{
  //   setError("");
  //   try {
  //     const temp = JSON.parse(localStorage.getItem("data"));
  //     let url = config.getProductDetail + id;
  //     let options = {
  //       method: "DELETE",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${temp?.auth}`,
  //       },
  //     };

  //     const response = await fetch(url, options);
  //     if (!response.ok) {
  //       setError("Response was not ok");
  //     }
  //     const data = await response.json();
  //    if (data.deletedCount) {
  //      getList();
  //    }
  //   } catch (error) {
  //     setError(error.message);
  //   }

  // }; 
  // console.log('my data', data);


  // console.log(productData);
  const handleImageClick = (id) => {
    navigate(`/ProductDetail/${id}`);
  };

  return (
    <div className="listcontainer">

      <h3 className="heading_addProduct">Product List</h3>
      <div className="input_div">
        <input
          type="text"
          onChange={onChangeSearch}
          value={searchProduct}
          placeholder="Search Product"
          className="input1"
        />
      </div>

      {!filterData || filterData.length <= 0 && <p>No Product found</p>}

      <p>{error}</p>

      <div className="api_data_show">
        {
          filterData && filterData.length > 0 && filterData?.map((item, ind) => (
            <div className="image_list" onClick={() => handleImageClick(item?._id)} key={item.id}>
              <div className="image_list_1">
                {item.thumbnail ? (<img src={item.thumbnail} width="300" height='300' />)
                  : (<p>No image</p>)}
              </div>

              <div className="image_list_2">
                <div>
                  <span style={{ marginRight: '6px' }}>Title:</span>
                  <label style={{ color: "green" }}>{item.name}</label>
                </div>

                <div>
                  <span style={{ marginRight: '6px' }}>Price:</span>
                  <label style={{ color: "green" }}>{item.price}</label></div>
              </div>

              <div className="image_list_2">

                <div>
                  <span style={{ marginRight: '6px' }}>Category:</span>
                  <label style={{ color: "green" }}>{item.category}</label>
                </div>

                <div>
                  <span style={{ marginRight: '6px' }}>Rating:</span>
                  <label style={{ color: "green" }}>{item.rating}</label></div>
              </div>

            </div>
          ))}
      </div>

    </div>
  );
}

export default ProductList;
