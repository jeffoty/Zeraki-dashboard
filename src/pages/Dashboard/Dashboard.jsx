import React, { useState, useEffect } from 'react';
import Graph from '../../components/Graph/Graph'
import Chart from '../../components/Chart/Chart'
import Cards from '../../components/Card/Cards'
import axios from 'axios';
import InvoiceList from '../../components/Invoice/InvoiceList';

function Dashboard() {
  const [invoices, setInvoices] = useState([])
  const [schools, setSchools] = useState([])
  const [collections, setCollections] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const invoiceResponse = await axios.get("https://my-json-server-1g8i.onrender.com/invoices")
        setInvoices(invoiceResponse.data)
        const schoolResponse = await axios.get("https://my-json-server-1g8i.onrender.com/schools")
        setSchools(schoolResponse.data)
        const collectionResponse = await axios.get("https://my-json-server-1g8i.onrender.com/collections")
        setCollections(collectionResponse.data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [])

  return (
    <div className='h-screen w-full px-4 bg-slate-50 overflow-y-auto'>
      <h1 className='font-bold text-4xl m-3'>Zeraki</h1>
      <div className='flex max-md:flex-wrap gap-2'>
        <Cards invoices={invoices} schools={schools} collections={collections} />
      </div>
      <div className='flex justify-between mt-4 gap-x-2 max-md:gap-4 max-md:flex-wrap w-full'>
        <Chart />
        <Graph />
      </div>
      <div className='w-full flex gap-4'>
        <InvoiceList invoices={invoices} />
      </div>
    </div>
  )
}

export default Dashboard