import axios from 'axios';
import React, { useState } from 'react'

function SchoolForm({ handleFormSubmit }) {
  const currentDate = new Date().toISOString().split('T')[0];
  const [formData, setFormData] = useState({
    name: '',
    type: 'primary',
    product: 'Zeraki Analytics',
    county: '',
    phone: '',
    email: '',
    total: 0,
    registrationDate: currentDate,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/schools', formData);
      handleFormSubmit(response.data)
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }

    console.log(formData);
  };

  return (
    <div className="max-w-md mx-auto my-4 bg-white p-8 border border-gray-300 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Create School</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-wrap gap-4">
          <div className='flex-1'>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className='flex-1'>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
            <select
              name="type"
              id="type"
              value={formData.type}
              onChange={handleChange}
              className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              <option value="primary">Primary</option>
              <option value="secondary">Secondary</option>
              <option value="IGSE">IGSE</option>
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="product" className="block text-sm font-medium text-gray-700">Product</label>
          <select
            name="product"
            id="product"
            value={formData.product}
            onChange={handleChange}
            className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          >
            <option value="Zeraki Analytics">Zeraki Analytics</option>
            <option value="Zeraki Finance">Zeraki Finance</option>
            <option value="Zeraki Timetable">Zeraki Timetable</option>
          </select>
        </div>
        <div>
          <label htmlFor="county" className="block text-sm font-medium text-gray-700">County</label>
          <input
            type="text"
            name="county"
            id="county"
            value={formData.county}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="flex flex-wrap gap-4">
          <div className='flex-1'>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className='flex-1'>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-4">
          <div className='flex-1'>
            <label htmlFor="total" className="block text-sm font-medium text-gray-700">Total</label>
            <input
              type="number"
              name="total"
              id="total"
              value={formData.total}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
              disabled
            />
          </div>
          <div className='flex-1'>
            <label htmlFor="registrationDate" className="block text-sm font-medium text-gray-700">Registration Date</label>
            <input
              type="date"
              name="registrationDate"
              id="registrationDate"
              value={formData.registrationDate}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
              disabled
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default SchoolForm