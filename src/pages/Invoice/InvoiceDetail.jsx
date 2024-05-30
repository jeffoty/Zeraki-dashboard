import { IconChevronLeft, IconTicket, IconTrash } from '@tabler/icons-react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import CollectionList from '../../components/Collection/CollectionList'
import CollectionForm from '../../components/Collection/CollectionForm'

function InvoiceDetail() {
  const [invoice, setInvoice] = useState(null)
  const [school, setSchool] = useState(null)
  const [collections, setCollections] = useState(null)
  const navigate = useNavigate()
  const { invoiceId } = useParams()

  useEffect(() => {
    console.log(invoiceId);
    const fetchData = async () => {

      try {
        const invoiceResponse = await axios.get(`https://my-json-server-1g8i.onrender.com/invoices/${invoiceId}`)
        setInvoice(invoiceResponse.data)

        const schoolResponse = await axios.get(`https://my-json-server-1g8i.onrender.com/schools/${invoiceResponse.data.schoolId}`)
        setSchool(schoolResponse.data)

        const collectionsResponse = await axios.get('https://my-json-server-1g8i.onrender.com/collections/')
        setCollections(collectionsResponse.data.filter(collection => collection.invoiceId == invoiceId))
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [])

  const handleDelete = async () => {
    try {
      await axios.delete(`https://my-json-server-1g8i.onrender.com/invoices/${invoiceId}`)
      navigate(-1)
    } catch (error) {
      console.error(error)
    }
  }

  const handleFormSubmit = (responseData) => {
    setCollections([...collections, responseData])
  }

  const invoiceAmountPaid = () => {
    const validCollections = collections?.filter(collection => collection.status == "Valid")
    const total = validCollections?.reduce((total, collection) => total + collection.amount, 0)
    return total
  }

  return (
    <div className='m-4 w-full'>
      <button onClick={() => navigate(-1)} className='my-5 rounded-full bg-blue-500 w-[40px] h-[40px] flex justify-center items-center '>
        <IconChevronLeft color='white' />
      </button>
      <div className='flex gap-4 items-center'>
        <div className='rounded-full flex justify-center items-center bg-slate-200 w-[100px] h-[100px]'>
          <IconTicket size={50} stroke={1} />
        </div>

        <div className='flex flex-col'>
          <div className=' flex items-center gap-4'>
            <h1 className='text-3xl font-semibold'>{invoice?.invoiceNumber}</h1>
            <button onClick={handleDelete} className='bg-red-500 rounded-full p-2'>
              <IconTrash color='white' stroke={1} />
            </button>
          </div>
          <p className='text-md'>{invoice?.item}</p>
        </div>
      </div>
      <div>
        <div className="w-full flex flex-wrap my-4 p-4 gap-4 text-sm">
          <div className=''>
            <h1 className='text-xl font-semibold'>Details:</h1>
            <p className='py-1 flex gap-1 items-center'>{school?.name}</p>
            <p className='py-1 flex gap-1 items-center'><span className='font-semibold'>Due Date:</span>{invoice?.dueDate}</p>
            <p className='py-1 flex gap-1 items-center'><span className='font-semibold'>Created:</span>{invoice?.creationDate}</p>
          </div>
          <div className="border-l-2 border-gray-300"></div>
          <div className=''>
            <p>{
              console.log(school)}</p>
            <h1 className='text-xl font-semibold'>Total:</h1>
            <p className='py-1'><span className='font-semibold'>Amount:</span> {invoice?.amount}</p>
            <p className='py-1'><span className='font-semibold'>Paid:</span> {invoiceAmountPaid()}</p>
            <p className='py-1'><span className='font-semibold'>Balance:</span> {invoice?.amount - invoiceAmountPaid()}</p>
          </div>
        </div>
        <CollectionForm invoiceId={invoiceId} handleFormSubmit={handleFormSubmit} invoiceBalance={invoice?.amount - invoiceAmountPaid()} invoiceAmountPaid={invoiceAmountPaid} invoice={invoice} schoolId={school?.id} schoolBalance={school?.balance} />
        <CollectionList collections={collections} />
      </div>
    </div>
  )
}

export default InvoiceDetail