import  { useState } from 'react';
import axios from 'axios';

const CreateProduct = () => {
  const [productName, setProductName] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [roomType, setRoomType] = useState('');
  const [pricePerNight, setPricePerNight] = useState('');
  const [maxOccupancy, setMaxOccupancy] = useState('');
  const [roomSize, setRoomSize] = useState('');
  const [isAvailable, setIsAvailable] = useState(false);
  const [description, setDescription] = useState('');
  const [productImage, setProductImage] = useState(null);

 
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();  

   
    formData.append('product_name', productName);
    formData.append('room_number', roomNumber);
    formData.append('room_type', roomType);
    formData.append('price_per_night', pricePerNight);
    formData.append('max_occupancy', maxOccupancy);
    formData.append('room_size', roomSize);
    formData.append('availability_status', isAvailable);
    formData.append('description', description);
    formData.append('product_image', productImage); 

    try {
      
      const response = await axios.post('http://localhost:8080/api/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);  
    } catch (error) {
      console.error(error); 
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Product Name:</label>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Room Number:</label>
        <input
          type="text"
          value={roomNumber}
          onChange={(e) => setRoomNumber(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Room Type:</label>
        <input
          type="text"
          value={roomType}
          onChange={(e) => setRoomType(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Price per Night:</label>
        <input
          type="number"
          value={pricePerNight}
          onChange={(e) => setPricePerNight(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Max Occupancy:</label>
        <input
          type="number"
          value={maxOccupancy}
          onChange={(e) => setMaxOccupancy(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Room Size:</label>
        <input
          type="number"
          value={roomSize}
          onChange={(e) => setRoomSize(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Is Available:</label>
        <input
          type="checkbox"
          checked={isAvailable}
          onChange={(e) => setIsAvailable(e.target.checked)}
        />
      </div>

      <div>
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Product Image:</label>
        <input
          type="file"
          onChange={(e) => setProductImage(e.target.files[0])}
          required
        />
      </div>

      <button type="submit">Create Product</button>
    </form>
  );
};

export default CreateProduct;
