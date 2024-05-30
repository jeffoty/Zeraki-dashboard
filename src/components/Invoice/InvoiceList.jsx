import React from 'react'
import InvoiceListItem from './InvoiceListItem'

function InvoiceList({ invoices }) {

  return (
    <div className="p-4 bg-white rounded-lg shadow-md my-4 w-full border-slate-200 border">
      <h2 className="font-semibold text-xl py-4">Invoices</h2>
      <table className="min-w-full bg-white divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice No.</th>
            <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
            <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
            <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
            <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
            <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Completion Status</th>
            <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {invoices.map((invoice) => (
            <InvoiceListItem key={invoice.id} invoice={invoice} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default InvoiceList