import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetailPage = () => {
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
      const url = `https://dummyjson.com/products/${id}`;
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

  return (
    <div className="container">
      {error ? (
        <p>{error}</p>
      ) : (
        <div className="product-detail">
          <div className="product-info">
            <h3 className="product-title">{product.title}</h3>
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
          </div>

          <div className="product-images">
            <div className="image-preview">
              <img src={selectedImage} alt={product.title} />
            </div>
            <div className="image-gallery">
              {product.images && product.images.length > 0 ? (
                product.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${product.title} ${index}`}
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
