import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import config from '../../utils/config';


const MAX_FILES = 3;
const MAX_SIZE_MB = 5;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

const UpdateProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [company, setCompnay] = useState('');
  const [rating, setRating] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [returnPoilcy, setReturnPolicy] = useState('');
  const [warranty, setWarranty] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnail, setSelectedThumbImage] = useState(null);
  const [thumbnailFromServer, setServerThumbnail] = useState(null);
  const [images, setImage] = useState(null);
  const [imagesFromServer, setServerImages] = useState(null);
  const [error, setError] = useState(false);

  const params = useParams();
  const navigate = useNavigate();

  let token = localStorage.getItem('token')
  try {
    token = token ? `bearer ${JSON.parse(token)}` : null;
  } catch (error) {
    console.error("Error parsing JSON token:", error);
  }

  useEffect(() => {
    getProductDetails();
  }, [])



  const getProductDetails = async () => {
    console.warn(params)
    let result = await fetch(config.getProductDetail + params.id, {
      headers: { authorization: token }
    });
    let res = await result.json();
    if (result?.status && result.status < 202) {
      setName(res.name);
      setPrice(res.price);
      setCategory(res.category);
      setCompnay(res.company)
      setQuantity(res.quantity)
      setDescription(res.description)
      setRating(res.rating)
      setReturnPolicy(res.returnPolicy)
      setWarranty(res.warranty)
      setServerThumbnail(res.thumbnail)
      setServerImages(res.images)
    } else {
      alert(res?.result.toString())
    }
  }

  const updateProduct = async () => {
    const temp = JSON.parse(localStorage.getItem("data"));

    let token = temp?.auth;
    let userId = temp?.result?._id;
    if (name && price && category && company && rating && quantity && returnPoilcy && warranty && description) {
      let formData = new FormData();
      if (thumbnail) { formData.append('thumbnail', thumbnail); }
      if (images && images !== '') { images.forEach((file) => { formData.append('images', file) }) }

      formData.append('name', name);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('company', company);
      formData.append('userId', userId);
      formData.append('quantity', quantity);
      formData.append('description', description);
      formData.append('rating', rating);
      formData.append('returnPolicy', returnPoilcy);
      formData.append('warranty', warranty);

      let result = await fetch(config.getProductDetail + params.id, {
        method: 'PUT',
        body: formData,
        headers: { "authorization": token }
      });
      let res = await result.json();
      if (result?.status && result.status < 202) {
        navigate('/')
      } else {
        alert(res?.result.toString())
      }
    }
    else {
      if (!thumbnail || !images) alert("All fields are required")
      else setError(true); return false

    }
  }

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);

    if (selectedFiles.length > MAX_FILES) {
      event.target.value = null;
      alert('You can only select up to 3 images.');
      return;
    }

    const oversizedFiles = selectedFiles.filter(file => file.size > MAX_SIZE_BYTES);

    if (oversizedFiles.length > 0) {
      event.target.value = null;
      alert(`Each file must be less than ${MAX_SIZE_MB} MB.`);
      return;
    }

    if (selectedFiles.length > 0) {
      setImage(selectedFiles);
    } else {
      console.log(selectedFiles);
    }

  };


  const handleThumbImageChange = (e) => {
    const file = e.target.files[0];
    if (file) { setSelectedThumbImage(file); }
  };

  return (
    <div className='productContainer'>

      <h1>Update Product</h1>
      <input type="text" placeholder='Enter product name' className='inputBox'
        value={name} onChange={(e) => { setName(e.target.value) }}
      />
      {error && !name && <span className='invalid-input'>Enter valid name</span>}

      <input type="text" placeholder='Enter product price' className='inputBox'
        value={price} onChange={(e) => isNaN(e.target.value) ? null : setPrice((e.target.value))}
      />
      {error && !price && <span className='invalid-input'>Enter valid price</span>}

      <input type="text" placeholder='Enter product category' className='inputBox'
        value={category} onChange={(e) => { setCategory(e.target.value) }}
      />
      {error && !category && <span className='invalid-input'>Enter valid category</span>}

      <input type="text" placeholder='Enter product company' className='inputBox'
        value={company} onChange={(e) => { setCompnay(e.target.value) }}
      />
      {error && !company && <span className='invalid-input'>Enter valid company</span>}

      <input type="text" placeholder='Enter product quantity' className='inputBox'
        value={quantity} onChange={(e) => isNaN(e.target.value) ? null : setQuantity((e.target.value))}
      />
      {error && !quantity && <span className='invalid-input'>Enter valid quantity</span>}

      <input type="text" placeholder='Enter product rating' className='inputBox'
        value={rating} onChange={(e) => isNaN(e.target.value) ? null : setRating((e.target.value))}
      />
      {error && !rating && <span className='invalid-input'>Enter valid Rating</span>}

      <input type="text" placeholder='Enter product return policy' className='inputBox'
        value={returnPoilcy} onChange={(e) => { setReturnPolicy(e.target.value) }}
      />
      {error && !returnPoilcy && <span className='invalid-input'>Enter valid return policy</span>}

      <input type="text" placeholder='Enter product warranty' className='inputBox'
        value={warranty} onChange={(e) => { setWarranty(e.target.value) }}
      />
      {error && !warranty && <span className='invalid-input'>Enter valid Warranty</span>}

      <input type="text" placeholder='Enter product description' className='inputBox'
        value={description} onChange={(e) => { setDescription(e.target.value) }}
      />
      {error && !description && <span className='invalid-input'>Enter valid description</span>}

      <div className="inputBox">
        <input type="file" accept="image/*" id="imageInput" onChange={(e) => handleThumbImageChange(e)} />

        {thumbnailFromServer || thumbnail ? (
          <img
            src={thumbnail ? URL.createObjectURL(thumbnail) : thumbnailFromServer ? `${thumbnailFromServer}` : null}
            alt="Selected" className="imgNew" />) : null}

      </div>

      <div className="inputBox">
        <input type="file" accept="image/*" multiple id="imageInput" onChange={(e) => handleFileChange(e)} />
      </div>

      <div className='flAlCenter'>

        <button onClick={updateProduct} className='appButton'>Update Product</button>

        {images && images !== '' ? images.map((img, index) => (
          <img
            src={img ? URL.createObjectURL(img) : null}
            alt={`Selected ${index}`} className="imgMany" />
        )) :
          imagesFromServer && imagesFromServer !== '' ? imagesFromServer.map((img, index) => (
            <img
              src={img}
              alt={`Selected ${index}`} className="imgMany" />
          ))
            : null}



      </div>
    </div>
  )
}

export default UpdateProduct;