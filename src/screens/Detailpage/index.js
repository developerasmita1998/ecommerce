import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import config from "../../utils/config";

const ProductDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  const fetchProductDetails = async () => {
    setError("");
    try {
      let url = config.getProductDetail + id;
      const options = {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(url, options);
      if (!response.ok) {
        setError("Response was not ok");
        return;
      }

      const data = await response.json();
      console.log("Fetched Product Data:", data);
      setProduct(data);
      setSelectedImage(data.thumbnail);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleClick = () => {
    navigate(`/updateProduct/${id}`);
  };

  const deleteProduct = async () => {
    const temp = JSON.parse(localStorage.getItem("data"));
    let token = temp?.auth;
    let result = await fetch(config.getProductDetail + id, {
      method: "Delete",
      headers: {
        authorization: `Bearer ${token}`
      },
    });
    let res = await result.json();
    if (result?.status && result.status < 202) {
      navigate('/')
    } else {
      alert(res?.result.toString())
    }
  }


  return (
    <div className="listcontainer">
      {error ? (
        <p>{error}</p>
      ) : (
        <div className="product-detail">
          <div className="product-info">
            <h3 className="product-title">{product.name}</h3>
            <p className="product-price">Price: ₹{product.price}</p>
            <p className="product-category">Category: {product.category}</p>
            <p className="product-rating">Rating: {product.rating}</p>

            {/* Return Policy Section */}
            <div className="product-policy">
              <h4>Return Policy</h4>
              <p>{product.returnPolicy}</p>
            </div>

            {/* Brand Section */}
            <div className="product-brand">
              <h4>Brand</h4>
              <p>{product.brand}</p>
            </div>

            {/* Warranty Section */}
            <div className="product-warranty">
              <h4>Warranty</h4>
              <p>{product.warranty}</p>
            </div>

            {/* Product Description */}
            <div className="product-description">
              <h4>Description</h4>
              <p>{product.description}</p>
            </div>

            <button className="button_delete" onClick={() => deleteProduct()}>
              Delete
            </button>
            <button className="button_update" onClick={() => handleClick()}>
              Update
            </button>
          </div>

          <div className="product-images">
            <div className="image-preview">
              <img src={selectedImage} alt={product.name} />
            </div>
            <div className="image-gallery">
              {product.images && product.images.length > 0 ? (
                product.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${product.name} ${index}`}
                    onClick={() => handleImageClick(image)}
                    className="thumbnail"
                  />
                ))
              ) : (
                <p>No additional images available.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
