import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./SignUpPage.css";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    gender: "",
    tennisLevel: "",
    city: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    let formIsValid = true;
    let errors = {};

    if (!formData.username) {
      errors.username = "Username is required";
      formIsValid = false;
    }
    if (!formData.gender) {
      errors.gender = "Gender is required";
      formIsValid = false;
    }
    if (!formData.tennisLevel) {
      errors.tennisLevel = "Tennis level is required";
      formIsValid = false;
    }
    if (!formData.city) {
      errors.city = "City is required";
      formIsValid = false;
    }
    if (!formData.phoneNumber) {
      errors.phoneNumber = "Phone number is required";
      formIsValid = false;
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      errors.phoneNumber = "Phone number must be 10 digits";
      formIsValid = false;
    }
    if (!formData.password) {
      errors.password = "Password is required";
      formIsValid = false;
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
      formIsValid = false;
    }
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
      formIsValid = false;
    }

    setErrors(errors);
    return formIsValid;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      try {
        const response = await axios.post(
          "https://your-api-url.com/api/register",
          {
            username: formData.username,
            gender: formData.gender,
            tennisLevel: formData.tennisLevel,
            city: formData.city,
            phoneNumber: formData.phoneNumber,
            password: formData.password,
          }
        );
        setIsLoading(false);
        navigate("/login"); // Redirect user to login page after successful registration
      } catch (error) {
        setIsLoading(false);
        if (error.response) {
          setErrors({
            form: "Registration Failed: " + error.response.data.message,
          });
        } else if (error.request) {
          setErrors({ form: "No response from the server" });
        } else {
          setErrors({ form: "Error: " + error.message });
        }
      }
    }
  };

  return (
    <div className="container form-container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control form-input"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && (
            <div className="text-danger">{errors.username}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="gender" className="form-label">
            Gender
          </label>
          <select
            className="form-select"
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && <div className="text-danger">{errors.gender}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="tennisLevel" className="form-label">
            Tennis Level
          </label>
          <select
            className="form-select"
            id="tennisLevel"
            name="tennisLevel"
            value={formData.tennisLevel}
            onChange={handleChange}
          >
            <option value="">Select Level</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
          {errors.tennisLevel && (
            <div className="text-danger">{errors.tennisLevel}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="city" className="form-label">
            City
          </label>
          <input
            type="text"
            className="form-control form-input"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
          {errors.city && (
            <div className="text-danger">{errors.city}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="phoneNumber" className="form-label">
            Phone Number
          </label>
          <input
            type="text"
            className="form-control form-input"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          {errors.phoneNumber && (
            <div className="text-danger">{errors.phoneNumber}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control form-input"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && (
            <div className="text-danger">{errors.password}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control form-input"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <div className="text-danger">{errors.confirmPassword}</div>
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          {isLoading ? "Signing Up..." : "Sign Up"}
        </button>
        {errors.form && (
          <div className="alert alert-danger mt-3">{errors.form}</div>
        )}
      </form>
    </div>
  );
};

export default SignUpPage;
