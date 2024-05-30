import axios from 'axios';
import { parse } from 'postcss';
import React, { useState } from 'react'

function CollectionForm({ invoiceId, handleFormSubmit, invoiceBalance, invoiceAmountPaid, invoice, schoolId, schoolBalance }) {
  const currentDate = new Date().toISOString().split('T')[0];
  const [formData, setFormData] = useState({
    invoiceId: invoiceId,
    collectionNumber: "",
    dateOfCollection: currentDate,
    status: "Valid",
    amount: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const parsedAmount = parseFloat(formData.amount)
    try {
      const data = {
        ...formData,
        amount: parsedAmount,
      };

      axios.post('http://localhost:3000/collections', data)
        .then(resp => {
          console.log("coll submitted", resp.data)
          handleFormSubmit(resp.data)
        })
        .catch(error => console.error(error))



      if (parsedAmount === invoiceBalance) {
        // update invoice balances
        axios.patch(`http://localhost:3000/invoices/${invoiceId}`, {
          status: "Completed",
          balance: 0,
          paidAmount: invoice.amount,
        }).then(resp => console.log("completed", resp.data))
          .catch(error => console.error(error))

        // update school balances
        const newSchoolBalance = schoolBalance - parsedAmount
        console.log(newSchoolBalance);
        axios.patch(`http://localhost:3000/schools/${schoolId}`, {
          balance: newSchoolBalance
        })
      } else {
        const newBalance = invoiceBalance - parsedAmount
        const newPaidAmount = invoiceAmountPaid() + parsedAmount
        axios.patch(`http://localhost:3000/invoices/${invoiceId}`, {
          balance: newBalance,
          paidAmount: newPaidAmount,
        }).then(resp => console.log("partial payment", resp.data))
          .catch(error => console.error(error))
      }

      setFormData({
        invoiceId: invoiceId,
        collectionNumber: "",
        dateOfCollection: currentDate,
        status: "Valid",
        amount: ""
      })
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl my-4 border-slate-200 border">
      <h1 className='font-semibold text-xl p-4'>Create Collection</h1>
      <form onSubmit={handleSubmit} className="px-4 pb-2 mb-4 flex gap-4">
        <div className="mb-4 flex-1">
          <label className="block font-medium text-gray-700 mb-2" htmlFor="collectionNumber">
            Collection Number
          </label>
          <input
            type="text"
            id="collectionNumber"
            name="collectionNumber"
            value={formData.collectionNumber}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4 flex-1">
          <label htmlFor="status" className="block font-medium text-gray-700 mb-2">Status</label>
          <select
            name="status"
            id="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          >
            <option value="Valid">Valid</option>
            <option value="Bounced">Bounced</option>
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
        <div className='flex-1'>
          <label className="block font-medium text-gray-700 mb-2" htmlFor="due_date">
            Collection Date
          </label>
          <input
            type="date"
            name="dateOfCollection"
            id="dateOfCollection"
            value={formData.dateOfCollection}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
            disabled
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
}

export default CollectionForm