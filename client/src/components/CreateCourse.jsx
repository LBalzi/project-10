import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ValidationErrors from './ValidationErrors';

const CreateCourse = () => {
  const { authenticatedUser } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: ''
  });

  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!authenticatedUser) {
      alert('You must be signed in to create a course.');
      return;
    }

    const { emailAddress, password, id: userId } = authenticatedUser;

    try {
      const res = await fetch('http://localhost:5000/api/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa(`${emailAddress}:${password}`)
        },
        body: JSON.stringify({
          userId,
          ...formData
        })
      });

      if (res.status === 201) {
        const locationHeader = res.headers.get('Location');
        let newCourseId = null;
      
        if (locationHeader) {
          newCourseId = locationHeader.split('/').pop();
        } else {
          const text = await res.text();
          if (text) {
            const data = JSON.parse(text);
            newCourseId = data.id || data.course?.id || null;
          }
        }
      
        if (newCourseId) {
          navigate(`/courses/${newCourseId}`);
        } else {
          navigate('/');
        }
      } else if (res.status === 400) {
        const data = await res.json();
        setErrors(data.errors || ['Validation failed']);
      } else {
        throw new Error('Failed to create course');
      }
    } catch (err) {
      console.error(err);
      setErrors(['An unexpected error occurred.']);
    }
  };

  return (
    <div className="wrap">
      <div className="form--centered">
        <h2>Create Course</h2>

            <ValidationErrors errors={errors} />          

        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Course Title</label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
          />

          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />

          <label htmlFor="estimatedTime">Estimated Time</label>
          <input
            id="estimatedTime"
            name="estimatedTime"
            type="text"
            value={formData.estimatedTime}
            onChange={handleChange}
          />

          <label htmlFor="materialsNeeded">Materials Needed</label>
          <textarea
            id="materialsNeeded"
            name="materialsNeeded"
            value={formData.materialsNeeded}
            onChange={handleChange}
          />

          <button className="button" type="submit">Create Course</button>
          <a href="/" className="button button-secondary">Cancel</a>
        </form>
      </div>
    </div>
  );
};

export default CreateCourse;