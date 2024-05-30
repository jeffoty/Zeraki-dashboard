import React from 'react'
import { IconEye, IconPencil } from '@tabler/icons-react'
import { Link } from 'react-router-dom'

function InvoiceListItem({ invoice }) {
  return (
    <tr key={invoice.id}>
      <td className="px-4 py-3 text-center text-sm whitespace-nowrap">{invoice.invoiceNumber}</td>
      <td className="px-4 py-3 text-center text-sm whitespace-nowrap">{invoice.product}</td>
      <td className="px-4 py-3 text-center text-sm whitespace-nowrap">{invoice.dueDate}</td>
      <td className="px-4 py-3 text-center text-sm whitespace-nowrap">{invoice.amount}</td>
      <td className="px-4 py-3 text-center text-sm whitespace-nowrap">{invoice.amount - invoice.paidAmount > 0 ? invoice.amount - invoice.paidAmount : "cleared"}</td>
      <td className="px-4 py-3 text-center text-sm whitespace-nowrap">{invoice.status}</td>
      <td className="px-4 py-3 text-center text-sm whitespace-nowrap"><Link to={`/invoices/${invoice.id}`} className=' flex justify-center items-center gap-1 bg-blue-500 px-2 py-1 rounded-2xl font-semibold text-white'>view <IconEye color='white' size={16} /></Link></td>
    </tr >
  )
}

export default InvoiceListItem