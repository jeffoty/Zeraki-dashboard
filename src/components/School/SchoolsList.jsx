import React, { useEffect, useState } from 'react'
import axios from 'axios'
import SchoolListItem from './SchoolListItem'
import SchoolForm from './SchoolForm'

function SchoolsList() {
  const [isVisible, setIsVisible] = useState(false)
  const [schools, setSchools] = useState([])

  useEffect(() => {
    axios.get("https://my-json-server-1g8i.onrender.com/schools")
      .then(resp => setSchools(resp.data))
  }, [])

  const toggleVisibility = () => {
    setIsVisible(!isVisible)
  }

  const handleFormSubmit = (responseData) => {
    // Add the new school data to the schools array
    setSchools([...schools, responseData]);
    setIsVisible(!isVisible)
  };


  return (
    <div className="m-4 p-4 bg-white rounded-lg shadow-md my-4">
      <div className='flex justify-between mb-4'>
        <h2 className="text-lg font-bold mb-4">Schools</h2>
        <button onClick={toggleVisibility} className='rounded-2xl text-white bg-blue-500 px-3 py-1'>{isVisible ? "Close Form" : "Register a school"}</button>
      </div>
      {
        isVisible ? <SchoolForm handleFormSubmit={handleFormSubmit} /> : ""
      }
      <table className="min-w-full bg-white divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">School ID</th>
            <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
            <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">County</th>
            <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
            <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
            <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {schools.map((school) => (
            <SchoolListItem key={school.id} school={school} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default SchoolsList