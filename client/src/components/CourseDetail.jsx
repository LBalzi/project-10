import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { authenticatedUser } = useAuth();

  const [course, setCourse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/courses/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch course');
        }
        return res.json();
      })
      .then((data) => {
        setCourse(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Fetch error:', err);
        setError('Could not load course');
        setLoading(false);
      });
  }, [id]);

  const handleDelete = async () => {
    if (!authenticatedUser) {
      alert('You must be signed in to delete a course.');
      return;
    }

    const confirmDelete = window.confirm('Are you sure you want to delete this course?');
    if (!confirmDelete) return;

    const { emailAddress, password } = authenticatedUser;

    try {
      const res = await fetch(`http://localhost:5000/api/courses/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Basic ' + btoa(`${emailAddress}:${password}`)
        }
      });

      if (res.status === 204) {
        navigate('/');
      } else if (res.status === 403) {
        alert('You are not authorized to delete this course.');
      } else {
        throw new Error('Delete failed');
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('An unexpected error occurred.');
    }
  };

  if (loading) return <p>Loading course...</p>;
  if (error) return <p>{error}</p>;
  if (!course) return <p>Course not found.</p>;

  const isOwner = authenticatedUser && authenticatedUser.id === course.userId;

  return (
    <div className="wrap">
      <div className="main--flex">
        <div>
          <h2 className="course--name">{course.title}</h2>

          {/* Show the course author */}
          {course.User && (
            <h3 className="course--author">
              By {course.User.firstName} {course.User.lastName}
            </h3>
          )}

          <h3 className="course--detail--title">Course Description</h3>
          <p style={{ whiteSpace: 'pre-line' }}>
            {course.description || 'No description provided.'}
          </p>
        </div>

        <div>
          <h3 className="course--detail--title">Estimated Time</h3>
          <p>{course.estimatedTime || 'N/A'}</p>

          <h3 className="course--detail--title">Materials Needed</h3>
          {course.materialsNeeded ? (
            <ul className="course--detail--list">
              {course.materialsNeeded.split('\n').map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          ) : (
            <p>No materials listed.</p>
          )}
        </div>
      </div>

      <div className="course--button-group">
        {isOwner && (
          <>
            <Link to={`/courses/${id}/update`} className="button">Update Course</Link>
            <button className="button" onClick={handleDelete}>Delete Course</button>
          </>
        )}
        <Link to="/" className="button button-secondary">Return to List</Link>
      </div>
    </div>
  );
};

export default CourseDetail;