import React, { useState } from 'react'
import { IconUser, IconReportMoney, IconCashBanknoteOff, IconCash } from '@tabler/icons-react'

function Cards({ invoices, schools, collections }) {
  const totalCollections = () => {
    const validCollections = collections.filter(collection => collection.status == "Valid")
    const total = validCollections.reduce((total, collection) => total + collection.amount, 0)
    return total
  }

  const bouncedCollections = () => {
    const bouncedCollections = collections.filter(collection => collection.status == "Bounced").length
    // const total = validCollections.reduce((total, collection) => total + collection.amount, 0)
    return bouncedCollections
  }

  const revenueCollected = () => {
    const totalRevenue = invoices.reduce((total, invoice) => total + invoice.amount, 0)
    const zerakiAnalytics = invoices.filter(invoice => invoice.product === "Zeraki Analytics")
    const zerakiTimetable = invoices.filter(invoice => invoice.product === "Zeraki Timetable")
    const zerakiFinance = invoices.filter(invoice => invoice.product === "Zeraki Finance")
    const revenueData = {
      "totalRevenue": totalRevenue,
      "analytics": zerakiAnalytics.reduce((total, invoice) => total + invoice.amount, 0),
      "timetable": zerakiTimetable.reduce((total, invoice) => total + invoice.amount, 0),
      "finance": zerakiFinance.reduce((total, invoice) => total + invoice.amount, 0),
    }
    return revenueData
  }

  return (
    <div className='bg-white shadow-md rounded-xl p-4'>
      <h1 className='font-semibold text-xl pb-4'>Overview</h1>
      <div className='flex gap-4 flex-wrap justify-between'>
        <div className='w-48 h-48 bg-yellow-100 rounded-xl p-2'>
          {
            totalCollections()
          }
          <IconReportMoney color='#facc15' size={40} />
          <h3>Collections</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
        </div>
        <div className='w-48 h-48 bg-green-100 rounded-xl p-2'>
          {
            revenueCollected().totalRevenue
          }
          <IconCash color='#22c55e' size={40} />
          <h3>Revenue</h3>
          <p><span className='font-semibold'>Zeraki Analytics:</span> {revenueCollected().analytics} </p>
          <p><span className='font-semibold'>Zeraki Timetable:</span> {revenueCollected().timetable} </p>
          <p><span className='font-semibold'>Zeraki Finance:</span> {revenueCollected().finance} </p>
        </div>
        <div className='w-48 h-48 bg-blue-100 rounded-xl p-2'>
          {schools.length}
          <IconUser color='#2563eb' size={40} />
          <h3>Sign Ups</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
        </div>
        <div className='w-48 h-48 bg-red-100 rounded-xl p-2'>
          {bouncedCollections()}
          <IconCashBanknoteOff color='#dc2626' size={40} />
          <h3>Bounced Cheques</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
        </div>
      </div>
    </div>
  )
}

export default Cards