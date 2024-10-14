import { useEffect, useState } from 'react';
import { IoMdBed } from "react-icons/io";
import { PiResizeBold } from "react-icons/pi";

const MiddleSection = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); 

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/products'); 
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const data = await response.json();
            setProducts(data); 
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts(); 
    }, []);

    if (loading) {
        return <div>Loading...</div>; 
    }

    if (error) {
        return <div>Error: {error}</div>; 
    }

    return (
        <div className="middle-section mt-40 ml-6">
            {products.length === 0 ? (
                <p className="text-sm">No products available</p>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"> 
                    {products.map((product) => (
                        <div key={product.id} className="product-card flex flex-col p-4 border border-gray-200 rounded-lg shadow-sm"> 
                            <div className="relative mb-2">
                                <img
                                    className="w-full h-auto" 
                                    src={`data:image/jpeg;base64,${product.productImage}`}
                                    alt={product.productName}
                                />
                              
                                <span className={`absolute bottom-0 left-0 bg-${product.status === 1 ? 'green' : 'red'}-500 text-white text-xs px-2 py-1`}>
                                    {product.status === 1 ? 'Available' : 'Not Available'}
                                </span>
                            </div>
                            <h2 className="text-md mb-2">{product.productName}</h2> 
                           
                            <div className="flex justify-between items-center mt-2">
                                <p className="text-md flex items-center"><IoMdBed /> {product.roomType}</p>
                                <p className="text-sm flex items-center"><PiResizeBold /> {product.roomSize} m</p>
                            </div>

                            <hr className="my-2 border-gray-300" /> 
                            
                            <p className="text-sm">{product.description}</p>
                            <p className="text-md mt-2">Price: R{product.pricePerNight}</p> 

                            
                            <div className="flex justify-center mt-4">
                                <button className='w-[130px] px-4 py-2 bg-yellow-500 text-white rounded-lg'>Book now</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MiddleSection;
