import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { useNavigate } from "react-router-dom";
import config from "../config";

const Login = () => {
  const navigate = useNavigate(); 
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isSignup, setIsSignup] = useState(false);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async (type = "login") => {
    console.log("Inside sendRequest");
    console.log(`Sending request to: ${config.BASE_URL}/api/users/${type}`);
    
    try {
      const res = await axios.post(`${config.BASE_URL}/api/users/${type}`, {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      });
      
      const data = res.data; // Use res.data directly
      console.log("Response data:", data); // Log the response data
      return data;
    } catch (err) {
      console.error("Error during API request", err); // Log the error
      throw err; // Re-throw the error to handle it in handleSubmit
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submit button clicked");
    console.log("Form submitted", inputs); // Check if inputs are correctly set

    try {
      let data;
      if (isSignup) {
        data = await sendRequest("signup");
        console.log("Signup response", data); // Log the signup response
      } else {
        data = await sendRequest(); // No argument defaults to "login"
        console.log("Login response", data); // Log the login response
      }

      localStorage.setItem("userId", data.user._id); // Store user ID in localStorage
      dispatch(authActions.login()); // Dispatch the login action
      navigate("/blogs"); // Navigate to blogs
    } catch (err) {
      console.error("Error during submission:", err); // Catch any errors
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={400}
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          justifyContent={"center"}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin="auto"
          marginTop={5}
          borderRadius={5}
        >
          <Typography variant="h2" padding={3} textAlign="center">
            {isSignup ? "Signup" : "Login"}
          </Typography>
          {isSignup && (
            <TextField
              name="name"
              onChange={handleChange}
              value={inputs.name}
              placeholder="Name"
              margin="normal"
            />
          )}
          <TextField
            name="email"
            onChange={handleChange}
            value={inputs.email}
            type={"email"}
            placeholder="Email"
            margin="normal"
          />
          <TextField
            name="password"
            onChange={handleChange}
            value={inputs.password}
            type={"password"}
            placeholder="Password"
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ borderRadius: 3, marginTop: 3 }}
            color="warning"
          >
            Submit
          </Button>
          <Button
            onClick={() => setIsSignup(!isSignup)}
            sx={{ borderRadius: 3, marginTop: 3 }}
          >
            Change To {isSignup ? "Login" : "Signup"}
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Login;
