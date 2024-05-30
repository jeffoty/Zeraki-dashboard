// InvoiceForm.js
import axios from 'axios';
import React, { useState } from 'react';

function InvoiceForm({ schoolId, handleFormSubmit, schoolTotal }) {
  const currentDate = new Date().toISOString().split('T')[0];
  const [formData, setFormData] = useState({
    schoolId: schoolId,
    invoiceNumber: '',
    product: 'Zeraki Analytics',
    amount: '',
    paidAmount: 0,
    balance: '',
    dueDate: '',
    creationDate: currentDate,
    status: 'Pending',
    daysUntilDue: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      schoolId: schoolId,
    });
  };

  const calculateDaysUntilDue = (creationDate, dueDate) => {
    const creation = new Date(creationDate);
    const due = new Date(dueDate);
    const timeDiff = due - creation;
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return daysDiff;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const calculatedBalance = parseFloat(formData.amount) + parseFloat(formData.paidAmount)
    const newSchoolTotal = schoolTotal + parseFloat(formData.amount)
    try {
      const data = {
        ...formData,
        amount: parseFloat(formData.amount),
        paidAmount: parseFloat(formData.paidAmount),
        balance: calculatedBalance,
        status: calculatedBalance > 0 ? "Pending" : "Completed",
        daysUntilDue: calculateDaysUntilDue(formData.creationDate, formData.dueDate)
      };
      const response = await axios.post('http://localhost:3000/invoices', data);
      handleFormSubmit(response.data)

      if (calculatedBalance > 0) {
        axios.patch(`http://localhost:3000/schools/${schoolId}`, {
          total: newSchoolTotal
        })
      }

      setFormData({
        schoolId: schoolId,
        invoiceNumber: '',
        product: 'Zeraki Analytics',
        amount: '',
        paidAmount: '',
        balance: '',
        dueDate: '',
        creationDate: currentDate,
        status: 'Pending',
        daysUntilDue: '',
      })
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl my-4 border-slate-200 border">
      <h1 className='font-semibold text-xl p-4'>Create Invoice</h1>
      <form onSubmit={handleSubmit} className="px-4 pb-2 mb-4 flex gap-4">
        <div className="mb-4 flex-1">
          <label className="block font-medium text-gray-700 mb-2" htmlFor="item">
            Invoice Number
          </label>
          <input
            type="text"
            id="invoiceNumber"
            name="invoiceNumber"
            value={formData.invoiceNumber}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4 flex-1">
          <label htmlFor="product" className="block font-medium text-gray-700 mb-2">Product</label>
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
        <div className="mb-4 flex-1">
          <label className="block font-medium text-gray-700 mb-2" htmlFor="amount">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4 flex-1">
          <label className="block font-medium text-gray-700 mb-2" htmlFor="paid amount">
            Paid Amount
          </label>
          <input
            type="number"
            id="paidAmount"
            name="paidAmount"
            value={formData.paidAmount}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4 flex-1">
          <label className="block font-medium text-gray-700 mb-2" htmlFor="balance">
            Balance
          </label>
          <input
            type="number"
            id="balance"
            name="balance"
            value={formData.amount - formData.paidAmount}
            onChange={handleChange}
            disabled
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4 flex-1">
          <label className="block font-medium text-gray-700 mb-2" htmlFor="due_date">
            Due Date
          </label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between flex-1">
          <button
            type="submit"
            className="bg-blue-500 hover:shadow-lg text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            Submit
          </button>
        </div>
      </form>
    </div >
  );
};

export default InvoiceForm;
