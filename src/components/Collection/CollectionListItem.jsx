import { IconEye } from '@tabler/icons-react'
import React from 'react'
import { Link } from 'react-router-dom'

function CollectionListItem({ collection }) {
  return (
    <tr>
      <td className="px-4 py-3 text-center text-sm whitespace-nowrap">{collection.collectionNumber}</td>
      <td className="px-4 py-3 text-center text-sm whitespace-nowrap">{collection.dateOfCollection}</td>
      <td className="px-4 py-3 text-center text-sm whitespace-nowrap">{collection.amount}</td>
      <td className="px-4 py-3 text-center text-sm whitespace-nowrap">{collection.status}</td>
      <td className="px-4 py-3 text-center text-sm whitespace-nowrap"><Link to={`/collections/${collection.id}`} className=' flex justify-center items-center gap-1 bg-blue-500 px-2 py-1 rounded-2xl font-semibold text-white'>view <IconEye color='white' size={16} /></Link></td>
    </tr >
  )
}

export default CollectionListItem