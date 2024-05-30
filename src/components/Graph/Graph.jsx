import React from 'react'
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function Graph() {

  const signups = [
    {
      product: "Zeraki Analytics",
      primary: 30,
      secondary: 25,
      igcse: 20
    },
    {
      product: "Zeraki Finance",
      primary: 20,
      secondary: 25,
      igcse: 20
    },
    {
      product: "Zeraki Timetable",
      primary: 25,
      secondary: 30,
      igcse: 15
    }
  ];


  return (
    <div className='md:w-1/2  bg-white p-2 rounded-md shadow-md'>
      <h1 className='text-xl font-medium'>Sign Ups overview</h1>
      <BarChart
        width={500}
        height={300}
        data={signups}
        className='m-4'
      >
        <XAxis dataKey="product" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="primary" fill="#93c5fd" activeBar={<Rectangle fill="#93c5fd" />} />
        <Bar dataKey="secondary" fill="#6ee7b7" activeBar={<Rectangle fill="#6ee7b7" />} />
        <Bar dataKey="igcse" fill="#fed7aa" activeBar={<Rectangle fill="#fed7aa" />} />
      </BarChart>
    </div>
  )
}

export default Graph