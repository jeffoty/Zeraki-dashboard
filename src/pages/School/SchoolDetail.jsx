import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { IconChevronLeft, IconMail, IconMapPin, IconPhone, IconSchool, IconTrash } from '@tabler/icons-react'
import InvoiceForm from '../../components/Invoice/InvoiceForm'
import InvoiceList from '../../components/Invoice/InvoiceList'

function SchoolDetail() {
  const { id } = useParams()
  const [school, setSchool] = useState([])
  const [invoices, setInvoices] = useState([])

  useEffect(() => {

    const fetchData = async () => {
      try {
        const schoolResponse = await axios.get(`https://my-json-server-1g8i.onrender.com/schools/${id}`)
        setSchool(schoolResponse.data)

        const invoicesResponse = await axios.get(`https://my-json-server-1g8i.onrender.com/invoices?schoolId=${id}`)
        setInvoices(invoicesResponse.data)
      } catch (error) {
        console.error(error)
      }

    }

    fetchData()
  }, [])

  const handleFormSubmit = (responseData) => {
    setInvoices([...invoices, responseData])
  }

  const handleDelete = async () => {
    try {
      await axios.delete(`https://my-json-server-1g8i.onrender.com/schools/${id}`)
      window.location.href = '/schools';
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='m-4 w-full'>
      <Link to="/schools" className='my-5 rounded-full bg-blue-500 w-[40px] h-[40px] flex justify-center items-center '>
        <IconChevronLeft color='white' />
      </Link>
      <div className='flex gap-4 items-center'>
        <div className='rounded-full flex justify-center items-center bg-slate-200 w-[100px] h-[100px]'>
          <IconSchool size={50} stroke={1} />
        </div>

        <div className='flex flex-col'>
          <div className=' flex items-center gap-4'>
            <h1 className='text-3xl font-semibold'>{school.name}</h1>
            <button onClick={handleDelete} className='bg-red-500 rounded-full p-2'>
              <IconTrash color='white' stroke={1} />
            </button>
          </div>
          <p className='text-md'>{school.type}</p>
        </div>
      </div>
      <div className="w-full flex flex-wrap my-4 p-4 gap-4 text-sm">
        <div className=''>
          <h1 className='text-xl font-semibold'>Contact Information:</h1>
          <p className='py-1 flex gap-1 items-center'><IconPhone size={16} stroke={1} />{school.phone}</p>
          <p className='py-1 flex gap-1 items-center'><IconMail size={16} stroke={1} />{school.email}</p>
          <p className='py-1 flex gap-1 items-center'><IconMapPin size={16} stroke={1} />{school.county}</p>
        </div>
        <div className="border-l-2 border-gray-300"></div>
        <div className=''>
          <h1 className='text-xl font-semibold'>Products:</h1>
          <p className='py-1'>{school.product}</p>
          <p className='py-1'><span className='font-semibold'>Total:</span> {school.total}</p>
          <p className='py-1'><span className='font-semibold'>Reg. Date:</span> {school.registrationDate}</p>
        </div>
      </div>
      <div>
        <InvoiceForm schoolId={school?.id} schoolTotal={school?.total} handleFormSubmit={handleFormSubmit} />
      </div>
      <InvoiceList invoices={invoices} />
    </div>
  )
}

export default SchoolDetail