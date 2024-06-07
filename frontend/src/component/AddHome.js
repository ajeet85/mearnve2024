import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { addContent } from '../features/homeSlice';

const AddHome = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [newData, setNewData] = useState({ pageTitle: '' }); // Initialize with default pagetitle
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
      const { name, value } = e.target;
      setNewData({ ...newData, [name]: value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (validateForm()) {
        dispatch(addContent(newData));
        navigate('/homein');
      }
    };
  
    const validateForm = () => {
      let errors = {};
      let isValid = true;
  
      if (!newData.pageTitle.trim()) {
        errors.pageTitle = 'Page Title is required';
        isValid = false;
      }
  
      setErrors(errors);
      return isValid;
    };

    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label>pagetitle:</label>
          <input
            type="text"
            name="pageTitle"
            value={newData.pageTitle}
            onChange={handleChange}
          />
          {errors.pageTitle && <span>{errors.pageTitle}</span>}
        </div>
        {/* Add more input fields for other form fields */}
        <button type="submit">Submit</button>
      </form>
    );
};

export default AddHome;
