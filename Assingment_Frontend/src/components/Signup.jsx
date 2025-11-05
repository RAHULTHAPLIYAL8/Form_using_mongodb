import React, { useState } from 'react';
import img1 from "../assets/Img2.jpg";
import { Link } from 'react-router-dom';

const Signup = () => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dob: '',
    number: '',
    password: '',
    confirmPassword: ''
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


    if(formData.dob.length===0 || formData.email.length===0 || formData.name.length===0 || formData.number.length===0 || formData.password.length===0|| formData.confirmPassword.length===0)
    {
      setBool(false);
      setError('Fill all the Fields');
    }
    
    if (formData.password !== formData.confirmPassword) {
      setBool(false);
      setError('Passwords do not match');
      return;
    }

    const response = await fetch('http://localhost:8000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    const result = await response.json();

    if (result.status === "ok") {
      setBool(true);
      console.log(result.message);
      setError(result.message);
    } else {
      setError(result.message || 'Something went wrong');
    }
  };

  return (
    <div className="container" style={{ display: "flex", justifyContent: "center", height: "100vh", width: "100vw", alignItems: "center", backgroundColor: "#f9f9f9" }}>
     
      <div className="Box-1">
        <div className="Box-1-a" style={{
          borderRadius: "10px",
          width: "98%",
          margin: "auto",
          height: "98%",
          padding: "2vh",
          backgroundImage: `url(${img1})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}></div>
      </div>

     
      <div className="Box-2" style={{
         height: "98%", display: "flex", flexDirection: "column", padding: "2vh", margin: "2vh", backgroundColor: "#fff",
        borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", alignItems: "center", paddingTop: "25vh"
      }}>
        <h1 style={{ fontWeight: "bold", marginBottom: "1vh", textAlign: "left", width: "100%" }}>Create an account!</h1>
        <p style={{ textAlign: "left", marginBottom: "2vh", width: "100%", color: "#555" }}>Enter your details below to create an account and get started</p>

     

        <form onSubmit={handleSubmit} style={{ width: "100%", display: "flex", flexWrap: "wrap", gap: "1.5vh" }}>
      
          <div  className="input" style={{ display: "flex", flexDirection: "column", width: "48%" }}>
            <label htmlFor="username" style={{ marginBottom: "0.5vh" }}>Username:</label>
            <input
              type="text"
              id="username"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter username"
              style={{
                outline: "none", border: "1px solid #ccc", padding: "0.5vw", borderRadius: "5px",
              }}
            />
          </div>

        
          <div className='input' style={{ display: "flex", flexDirection: "column", width: "48%" }}>
            <label htmlFor="email" style={{ marginBottom: "0.5vh" }}>Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              style={{
                outline: "none", border: "1px solid #ccc", padding: "0.5vw", borderRadius: "5px"
              }}
            />
          </div>

        
          <div className="input" style={{ display: "flex", flexDirection: "column", width: "48%" }}>
            <label htmlFor="password" style={{ marginBottom: "0.5vh" }}>Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              style={{
                outline: "none", border: "1px solid #ccc", padding: "0.5vw", borderRadius: "5px",
              }}
            />
          </div>

          <div  className="input" style={{ display: "flex", flexDirection: "column", width: "48%" }}>
            <label htmlFor="confirmPassword" style={{ marginBottom: "0.5vh" }}>Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              style={{
                outline: "none", border: "1px solid #ccc", padding: "0.5vw", borderRadius: "5px",
              }}
            />
          </div>
        </form>

       
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", marginTop: "2vh"
        }}>
          <button
            type="submit"
            onClick={handleSubmit}
            style={{
              width: "48%", padding: "1vh 0", color: "white", backgroundColor: "rgb(1, 48, 1)",
              border: "none", cursor: "pointer", boxShadow: "0 0 5px black", borderRadius: "5px", fontWeight: "bold"
            }}
          >
            Create an Account
          </button>

          <p style={{
            margin: 0, display: "flex", alignItems: "center", justifyContent: "center", width: "48%",
            textAlign: "left"
          }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "orange", textDecoration: "none", marginLeft: "5px" }}>Login</Link>
          </p>

          
        </div>
        {bool===true && <p style={{ color: 'green', fontSize: '1rem', marginTop: '2vh',border:"2px solid green",padding:"1vw" }}>{error}</p>}
        {bool===false && <p style={{ color: 'red', fontSize: '1rem', marginTop: '2vh' ,border:"2px solid red",padding:"1vw"}}>{error}</p>}
      </div>
    </div>
  );
};

export default Signup;
