import React, { useEffect, useState } from "react";
import "../../App.css";
import myImg from "../../assets/1.jpg";
import { Link, useNavigate } from "react-router-dom";
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

  // const getList = async () => {
  //   setError("");
  //   try {
  //     const temp = JSON.parse(localStorage.getItem("data"));
  //     setUserData(temp?.user);
  //     let url = config.productList;
  //     let options = {
  //       method: "GET",
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
  //     setProductData(data);
  //     setFilterData(data);
  //   } catch (error) {
  //     setError(error.message);
  //   }
  // };

  const getList = async () => {
    setError("");
    try {
      const temp = JSON.parse(localStorage.getItem("data"));
      setUserData(temp?.user);
      let url = 'https://dummyjson.com/products';
      let options = {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(url, options);
      if (!response.ok) {
        setError("Response was not ok");
      }
      const data = await response.json();
      setProductData(data?.products);
      setFilterData(data?.products);
    } catch (error) {
      setError(error.message);
    }
  };

  const onChangeSearch = (e) => {
    setSearchProduct(e.target.value);

    const filteredData =
      productData.length > 0 &&
      productData.filter((item) =>
        item.title.toLowerCase().includes(e.target.value.toLowerCase())
      );

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

      <div className="api_data_show">      
        {
          filterData && filterData.length >
           0 && filterData?.map((item, ind)=>
         (

              
          <div className="image_list" key={item.id}>
                <div className="image_list_1"onClick={() => handleImageClick(item.id)}>
                 {item.thumbnail ? (
                        <img src={item.thumbnail} width="300" height='300' />
                      )
                     : (
                      <p>No image</p>
                    )}

                  </div>

                    <div className="image_list_2">
                   
                    <div>
                      <span style={{marginRight:'6px'}}>Title:</span>
                    <label style={{color:"green"}}>{item.title}</label>
                    </div>

                    <div>
                      <span style={{marginRight:'6px'}}>Price:</span>
                    <label style={{color:"green"}}>{item.price}</label></div>
                    </div>

                    <div className="image_list_2">
                   
                   <div>
                     <span style={{marginRight:'6px'}}>Category:</span>
                   <label style={{color:"green"}}>{item.category}</label>
                   </div>

                   <div>
                     <span style={{marginRight:'6px'}}>Rating:</span>
                   <label style={{color:"green"}}>{item.rating}</label></div>
                   </div>





           </div>
               

                     
                      
          ))
        }
      </div>
    </div>
  );
}

export default ProductList;

// {item.images && item.images.length > 0 ? (
//   item.images.map((image, ind)=> (
//     <img src={image} width="600" />
//   ))
// ) : (
//   <p>No image</p>
// )}

{/* <h3 className="heading_addProduct"
>
  Product List
</h3>
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
            <button onClick={()=>deleteProduct(item._id)}>Delete</button>
            <button className="update" onClick={()=>navigate("/updateProduct/" + item._id)}>Update</button>
          </td>
        </tr>
      ))
    ) : (
      <p>{"No data found"}</p>
    )}
  </table>

  {error && (
    <div>
      {" "}
      <p>{error}</p>
    </div>
  )}
</div> */}
