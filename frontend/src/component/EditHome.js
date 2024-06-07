import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { editContent } from '../features/homeSlice';

const EditHome = () => {
  const dispatch = useDispatch();

  const { id } = useParams();
  const navigate = useNavigate();
  const contentList = useSelector((state) => state.home.contentList);

  const [updateData, setUpdateData] = useState({ pageTitle: '' }); // Initialize with default pageTitle

  useEffect(() => {
    if (id && contentList.length > 0) { // Ensure contentList has been fetched
      const parsedId = parseInt(id);
      const singleContent = contentList.find((ele) => ele.id === parsedId);
      setUpdateData(singleContent || { pageTitle: '' }); // Set default if no content found
    }else {
      navigate('/homein');  
    }
  }, [id, contentList,navigate]);

  console.log(updateData.pageTitle);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateData({ ...updateData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      //console.log(updateData);
      dispatch(editContent(updateData));
      navigate('/homein');  
    }
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!updateData.pageTitle.trim()) {
      errors.pageTitle = 'Page Title is required';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>pageTitle:</label>
        <input
  type="text"
  name="pageTitle"
  value={updateData.pageTitle}
  onChange={handleChange}
/>
        {errors.pageTitle && <span>{errors.pageTitle}</span>}
      </div>
      {/* Add more input fields for other form fields */}
      <button type="submit">Submit</button>
    </form>
  );
};

export default EditHome;

