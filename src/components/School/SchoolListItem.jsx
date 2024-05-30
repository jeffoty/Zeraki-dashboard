import React from 'react'
import { IconEye } from '@tabler/icons-react'
import { Link } from 'react-router-dom'

function SchoolListItem({ school }) {
  return (
    <tr>
      <td className="px-4 py-3 text-center text-sm whitespace-nowrap">{school.id}</td>
      <td className="px-4 py-3 text-center text-sm whitespace-nowrap">{school.name}</td>
      <td className="px-4 py-3 text-center text-sm whitespace-nowrap">{school.type}</td>
      <td className="px-4 py-3 text-center text-sm whitespace-nowrap">{school.county}</td>
      <td className="px-4 py-3 text-center text-sm whitespace-nowrap">{school.product}</td>
      <td className="px-4 py-3 text-center text-sm whitespace-nowrap">{school.balance}</td>
      <td className="px-4 py-3 text-center text-sm whitespace-nowrap"><Link to={`${school.id}`} className=' flex justify-center items-center gap-1 bg-blue-500 px-2 py-1 rounded-2xl font-semibold text-white'>view <IconEye color='white' size={16} /></Link></td>
    </tr>
  )
}

export default SchoolListItem