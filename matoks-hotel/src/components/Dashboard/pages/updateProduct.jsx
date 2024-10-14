import { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateProduct = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null); 
    const [productName, setProductName] = useState('');
    const [roomNumber, setRoomNumber] = useState('');
    const [roomType, setRoomType] = useState('');
    const [pricePerNight, setPricePerNight] = useState('');
    const [maxOccupancy, setMaxOccupancy] = useState('');
    const [roomSize, setRoomSize] = useState('');
    const [isAvailable, setIsAvailable] = useState(false);
    const [description, setDescription] = useState('');
    const [productImage, setProductImage] = useState(null);

   
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products', error);
        }
    };

    
    const handleUpdateClick = (product) => {
        setSelectedProduct(product);
        setProductName(product.productName);
        setRoomNumber(product.roomNumber);
        setRoomType(product.roomType);
        setPricePerNight(product.pricePerNight);
        setMaxOccupancy(product.maxOccupancy);
        setRoomSize(product.roomSize);
        setIsAvailable(product.isAvailable === 1);
        setDescription(product.description);
    };

   
    const handleDelete = async (productId) => {
        try {
            await axios.delete(`http://localhost:8080/api/products/${productId}`);
            fetchProducts(); 
        } catch (error) {
            console.error('Error deleting product', error);
        }
    };

    
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('product_name', productName);
        formData.append('room_number', roomNumber);
        formData.append('room_type', roomType);
        formData.append('price_per_night', pricePerNight);
        formData.append('max_occupancy', maxOccupancy);
        formData.append('room_size', roomSize);
        formData.append('availability_status', isAvailable ? 1 : 0);
        formData.append('description', description);
        if (productImage) {
            formData.append('product_image', productImage);
        }

        try {
            await axios.put(`http://localhost:8080/api/products/${selectedProduct.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            fetchProducts(); 
            setSelectedProduct(null); 
        } catch (error) {
            console.error('Error updating product', error);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Product List</h2>
            
         
            <table className="min-w-full table-auto">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Product Name</th>
                        <th className="px-4 py-2">Room Number</th>
                        <th className="px-4 py-2">Room Type</th>
                        <th className="px-4 py-2">Price Per Night</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id} className="border-t">
                            <td className="px-4 py-2">{product.productName}</td>
                            <td className="px-4 py-2">{product.roomNumber}</td>
                            <td className="px-4 py-2">{product.roomType}</td>
                            <td className="px-4 py-2">R{product.pricePerNight}</td>
                            <td className="px-4 py-2 flex gap-2">
                                <button 
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                                    onClick={() => handleUpdateClick(product)}
                                >
                                    Update
                                </button>
                                <button 
                                    className="px-4 py-2 bg-red-500 text-white rounded-md"
                                    onClick={() => handleDelete(product.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            
            {selectedProduct && (
                <div className="mt-6 p-6 bg-gray-100 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-4">Update Product: {selectedProduct.productName}</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700">Product Name:</label>
                            <input
                                type="text"
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Room Number:</label>
                            <input
                                type="text"
                                value={roomNumber}
                                onChange={(e) => setRoomNumber(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Room Type:</label>
                            <input
                                type="text"
                                value={roomType}
                                onChange={(e) => setRoomType(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Price Per Night:</label>
                            <input
                                type="text"
                                value={pricePerNight}
                                onChange={(e) => setPricePerNight(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Max Occupancy:</label>
                            <input
                                type="text"
                                value={maxOccupancy}
                                onChange={(e) => setMaxOccupancy(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Room Size (sqm):</label>
                            <input
                                type="text"
                                value={roomSize}
                                onChange={(e) => setRoomSize(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Availability:</label>
                            <input
                                type="checkbox"
                                checked={isAvailable}
                                onChange={(e) => setIsAvailable(e.target.checked)}
                                className="mr-2"
                            />
                            <span>{isAvailable ? 'Available' : 'Not Available'}</span>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Description:</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Product Image:</label>
                            <input
                                type="file"
                                onChange={(e) => setProductImage(e.target.files[0])}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md">Update Product</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default UpdateProduct;
