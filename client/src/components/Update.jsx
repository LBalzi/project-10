import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ValidationErrors from "./ValidationErrors";

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { authenticatedUser } = useAuth();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    estimatedTime: "",
    materialsNeeded: ""
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState([]); // ✅ for validation

  useEffect(() => {
    fetch(`http://localhost:5000/api/courses/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch course");
        }
        return response.json();
      })
      .then((data) => {
        setFormData({
          title: data.title || "",
          description: data.description || "",
          estimatedTime: data.estimatedTime || "",
          materialsNeeded: data.materialsNeeded || ""
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Could not load course");
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!authenticatedUser) {
      alert("You must be signed in to update a course.");
      return;
    }

    const { emailAddress, password } = authenticatedUser;

    try {
      const res = await fetch(`http://localhost:5000/api/courses/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + btoa(`${emailAddress}:${password}`)
        },
        body: JSON.stringify(formData)
      });

      if (res.status === 204) {
        navigate(`/courses/${id}`);
      } else if (res.status === 400) {
        const data = await res.json();
        setErrors(data.errors || ['Validation failed']);
      } else {
        throw new Error("Failed to update course");
      }
    } catch (err) {
      console.error(err);
      setErrors(['An unexpected error occurred.']);
    }
  };

  if (loading) return <p>Loading course...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="wrap">
      <div className="form--centered">
        <h2>Update Course</h2>

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

          <button className="button" type="submit">Update Course</button>
          <Link to="/" className="button button-secondary">Cancel</Link>
        </form>
      </div>
    </div>
  );
};

export default Update;