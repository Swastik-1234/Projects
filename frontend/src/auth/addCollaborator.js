
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './addCollaborator.css';

function AddCollaborator() {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [formData, setFormData] = useState({
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  useEffect(() => {
    const addCollaborator = async () => {
      if (!isSubmitting || !formData.email || !formData.message) return;
      try {
        const response = await axios.put(
          `http://localhost:3001/projects/${projectId}/addCollaborator`,
          formData,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        );
        // Display success message using SweetAlert
        Swal.fire({
          icon: 'success',
          title: response.data.message,
          showConfirmButton: false,
          timer: 1500
        });
        // Redirect to project page after successful addition of collaborator
        navigate(`/projects/${projectId}`);
      } catch (error) {
        console.error('Error adding collaborator:', error);
        // Display error message using SweetAlert
        setError('Failed to add collaborator. Please try again later.');
      } finally {
        setIsSubmitting(false);
      }
    };

    addCollaborator();
  }, [formData, isSubmitting, navigate, projectId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  };

  return (
    <div>
      <h2>Add Collaborator</h2>
      <form onSubmit={handleSubmit}>
      <div className="form-group">
          <label className="label" htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="input"
            required
          />
        </div>
        <div className="form-group">
          <label  className="label" htmlFor="message">Message:</label>
          <input
          type="text"
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="input"
            required
            // rows={4}
          />
        </div>
        <button type="submit" className="button">Add Collaborator</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default AddCollaborator;


