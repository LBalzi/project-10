import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/courses")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch");
        }
        return response.json(); 
      })
      .then((data) => {
        setCourses(data); 
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching courses:", err);
        setError("Failed to fetch courses");
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1></h1>
      {loading && <p>Loading courses...</p>}
      {error && <p>{error}</p>}
      <ul className="main--grid">
        {/* course cards */}
        {courses.map((course, index) => (
          <Link
            to={`/courses/${course.id}`}
            key={index}
            className="course--module"
            style={{
              textDecoration: "none",
              fontFamily: "Raleway, sans-serif",
            }}
          >
            <h3>Course</h3>
            <p className="course--title">{course.title}</p>
          </Link>
        ))}
  
        
        <Link to="/courses/create" className="course--module course--add--module">
          <h2 className="course--title">Create New Course</h2>
        </Link>
      </ul>
    </div>
  );
}

export default Courses;
