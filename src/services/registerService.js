import axios from "axios";
import { useState, useEffect } from "react";
import logo from "./assets/logoImage.png";
import { FaRegUserCircle } from "react-icons/fa";
import SlideShow from "./SlideShow";

const REST_API_BASE_URL = "http://localhost:8080/api/signup";

// API requests for fetching and creating users
export const getUserByEmail = (email) => axios.get(`${REST_API_BASE_URL}/by-email?email=${email}`);
export const createUser = (user) => axios.post(REST_API_BASE_URL, user);

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDiscountModalOpen, setIsDiscountModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsDiscountModalOpen(true);
  }, []);

  const handleUserClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setErrorMessage("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setFirstName("");
    setLastName("");
  };

  const closeDiscountModal = () => {
    setIsDiscountModalOpen(false);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await getUserByEmail(email);
      const user = response.data;

      if (user && user.password === password) {
        alert("Login successful!");
        closeModal();
      } else {
        setErrorMessage("Invalid email or password.");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setErrorMessage("An error occurred while fetching user data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const newUser = { firstName, lastName, email, password };
      await createUser(newUser);
      alert("Sign up successful!");
      closeModal();
    } catch (error) {
      console.error("Error during sign-up:", error);
      setErrorMessage("An error occurred during sign-up. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
    setErrorMessage("");
  };

  return (
    <section className="bg-transparent bg-red-300 m-0 p-0 h-32">
      {/* Navigation bar */}
      <nav className="absolute top-0 left-0 right-0 flex bg-black opacity-80 h-24 justify-between items-center p-4 z-10">
        <a href="/" className="rounded-2xl">
          <img src={logo} className="w-36" alt="Logo" />
        </a>
        <div className="flex gap-4 ml-4">
          <a href="#">
            <button className="bg-yellow-300 text-black py-2 px-4 opacity-80 rounded-lg">
              Book Now
            </button>
          </a>
          <a href="#">
            <div
              className="flex items-center bg-black rounded-lg px-1 py-2 cursor-pointer"
              onClick={handleUserClick}
            >
              <FaRegUserCircle className="text-white" size={28} />
            </div>
          </a>
        </div>
      </nav>

      {/* SlideShow Component */}
      <div style={{ marginTop: "6rem" }}>
        <SlideShow />
      </div>

      {/* Discount Modal */}
      {isDiscountModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-semibold mb-4 text-center">Special Discount!</h2>
            <p className="mb-4 text-center">
              Get 20% off on your first booking! Use code <strong>FIRST20</strong> at checkout.
            </p>
            <div className="flex justify-center">
              <button
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg"
                onClick={closeDiscountModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Login/Sign Up Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-semibold mb-4">{isSignUp ? "Sign Up" : "Sign In"}</h2>
            {errorMessage && (
              <p className="text-red-500 mb-4 text-center">{errorMessage}</p>
            )}
            <form onSubmit={isSignUp ? handleSignUpSubmit : handleLoginSubmit}>
              {/* Sign Up Fields */}
              {isSignUp && (
                <>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" htmlFor="firstName">
                      First Name:
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" htmlFor="lastName">
                      Last Name:
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </div>
                </>
              )}
              {/* Common Fields */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2" htmlFor="email">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2" htmlFor="password">
                  Password:
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {isSignUp && (
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2" htmlFor="confirmPassword">
                    Confirm Password:
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              )}
              
              <div className="flex justify-between mb-4">
                <button
                  type="submit"
                  className="px-4 py-2 bg-yellow-500 text-white rounded-lg w-full"
                  disabled={loading}
                >
                  {loading ? "Loading..." : (isSignUp ? "Sign Up" : "Sign In")}
                </button>
              </div>
            </form>
            <div className="text-center">
              <span>
                {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
                <button onClick={toggleSignUp} className="text-blue-500 underline">
                  {isSignUp ? "Sign In" : "Sign Up"}
                </button>
              </span>
            </div>
            <button
              onClick={closeModal}
              className="mt-4 text-gray-500 hover:text-black underline"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
