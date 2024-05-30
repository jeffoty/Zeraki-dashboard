import React from 'react'
import { IconTicket } from '@tabler/icons-react'

function Card() {
  return (
    <div className='w-48 h-48 bg-gray-200 rounded-md p-2'>
      <IconTicket />
      <h3>Title</h3>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
    </div>
  )
}

export default Card