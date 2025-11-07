import React, { useState } from 'react';
import img1 from "../assets/Img1.jpg";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [bool, setBool] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {



    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError('Please fill out both fields.');
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include'
      });

      const result = await response.json();

      if (result.status === 'ok') {
        setError(result.message);

        setBool(true);
        navigate('/home');
        console.log(result.message);
      } else {
        setBool(false);
        setError(result.message || 'Something went wrong.');
      }
    } catch (err) {
      setError('Error connecting to the server.');
    }
  };

  return (
    <div className="container" style={{ display: "flex", justifyContent: "center", height: "100vh", alignItems: "center", backgroundColor: "#f9f9f9" }}>
      <div className="Box-1" >
        <div
          className="Box-1-a"
          style={{
            borderRadius: "10px",
            width: "98%",
            margin: "auto",
            height: "98%",
            padding: "2vh",
            backgroundImage: `url(${img1})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        ></div>
      </div>

      <div className="Box-2" style={{ height: "98%", display: "flex", flexDirection: "column", padding: "2vh", margin: "2vh", backgroundColor: "#fff", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", alignItems: "center", paddingTop: "25vh" }}>
        <h1 style={{ fontWeight: "bold", marginBottom: "1vh", textAlign: "left", width: "100%" }}>Login</h1>

        <form onSubmit={handleSubmit} style={{ width: "100%", display: "flex", flexDirection: "column", gap: "1.5vh" }}>
          <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
            <label htmlFor="email" style={{ marginBottom: "0.5vh" }}>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email..."
              style={{
                outline: "none",
                border: "1px solid #ccc",
                padding: "0.5vw",
                borderRadius: "5px",
              
              }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
            <label htmlFor="password" style={{ marginBottom: "0.5vh" }}>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password..."
              style={{
                outline: "none",
                border: "1px solid #ccc",
                padding: "0.5vw",
                borderRadius: "5px",

              }}
            />
          </div>

          <button
            type="submit"
            style={{
              marginTop: "2vh",
              padding: "1vh 0",
              color: "white",
              backgroundColor: "rgb(1, 48, 1)",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 0 5px black",
              borderRadius: "5px",
              fontWeight: "bold",
              fontSize: "1rem",
            }}
          >
            Login
          </button>
        </form>

        <p style={{ marginTop: "2vh", textAlign: "center", color: "#555" }}>
          Don't have an account? <Link to="/" style={{ color: "orange", textDecoration: "none" }}>Sign up for free</Link>
        </p>
        {bool === true && <p style={{ color: 'green', fontSize: '1rem', marginTop: '2vh', border: "2px solid green", padding: "1vw" }}>{error}</p>}
        {bool === false && <p style={{ color: 'red', fontSize: '1rem', marginTop: '2vh', border: "2px solid red", padding: "1vw" }}>{error}</p>}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .Box-1 {
            display: none; /* Hide Box-1 on mobile and tablet */
          }
          .Box-2 {
            width: 100%; /* Make Box-2 full width */
          }
        }
      `}</style>
    </div>
  );
};

export default Signin;
