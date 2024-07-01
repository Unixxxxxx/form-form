import React, { useState } from 'react';
import axios from 'axios';

const FormComponent = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/form', formData);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting form', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {!isSubmitted ? (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Contact Us</h2>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Submit
          </button>
        </form>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Thank you for your submission!</h2>
          <img src="#" alt="Submission successful" className="mx-auto" />
        </div>
      )}
    </div>
  );
};

export default FormComponent;
