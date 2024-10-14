import React from "react"; 
import PropTypes from "prop-types";
import { FaRegUserCircle } from "react-icons/fa";
import logo from "./assets/logo.png"; 
import CreateProduct from "../pages/createProduct";
import UpdateProduct from "../pages/updateProduct"; 
import GetAllUsers from "../pages/getAllUsers";
const AdminDashBoard = ({ adminName }) => {
  const [activeComponent, setActiveComponent] = React.useState("home"); 
  const handleUserClick = () => {
    
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case "create-product":
        return <CreateProduct />;
      case "update-product":
        return <UpdateProduct />;
      case "get-all-users":
        return <GetAllUsers />;
      default:
        return <div className="p-4">Welcome to the Admin Dashboard! Please select an option from the menu.</div>;
    }
  };

  return (
    <div className="flex">
    
      <aside className="w-64 h-screen bg-gray-200 p-4">
        <div className="flex items-center mb-8">
          <img src={logo} className="w-24" alt="Logo" />
        </div>
        <nav className="flex flex-col">
          <button 
            onClick={() => setActiveComponent("create-product")}
            className="py-2 px-4 text-gray-700 hover:bg-gray-300 rounded-md text-left"
          >
            Create Product
          </button>
          <button 
            onClick={() => setActiveComponent("update-product")}
            className="py-2 px-4 text-gray-700 hover:bg-gray-300 rounded-md text-left"
          >
            Update Product
          </button>
          <button 
            onClick={() => setActiveComponent("get-all-users")}
            className="py-2 px-4 text-gray-700 hover:bg-gray-300 rounded-md text-left"
          >
            Get All Users
          </button>
        
        </nav>
      </aside>

      
      <div className="flex-1">
       
        <nav className="flex bg-white h-16 justify-between items-center p-4 shadow">
          <div className="flex-1 flex justify-end">
            <span className="text-black font-semibold">{adminName}</span>
            <a href="#">
             
            </a>
            <a href="#" onClick={handleUserClick} aria-label="User Profile">
              <div className="flex items-center bg-white rounded-xl px-1 py-2 cursor-pointer ml-4">
                <FaRegUserCircle className="text-black" size={28} />
              </div>
            </a>
          </div>
        </nav>

        
        <div className="p-4 mt-4">
          <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
         
          {renderComponent()}
        </div>
      </div>
    </div>
  );
};

AdminDashBoard.propTypes = {
  adminName: PropTypes.string.isRequired,
};

export default AdminDashBoard;
