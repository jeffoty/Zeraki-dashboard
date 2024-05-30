import React from 'react'
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const targets = [
  {
    product: "Zeraki Analytics",
    target: 100,
    achieved: 75
  },
  {
    product: "Zeraki Finance",
    target: 80,
    achieved: 65
  },
  {
    product: "Zeraki Timetable",
    target: 90,
    achieved: 70
  }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

function Chart() {
  return (
    <div className='md:w-1/2 bg-white p-2 rounded-lg shadow-md'>
      <h1 className='text-xl font-medium'>PieChart</h1>
      <div className='flex justify-center flex-wrap'>
        {targets.map((target, index) => (
          <PieChart width={200} height={200} key={index}>
            <Pie
              data={[
                { name: 'Achieved', value: target.achieved },
                { name: 'Remaining', value: target.target - target.achieved }
              ]}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={70}
              fill={COLORS[index % COLORS.length]}
              label
            >
              {[
                { name: 'Achieved', value: target.achieved },
                { name: 'Remaining', value: target.target - target.achieved }
              ].map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        ))}
      </div>
    </div>
  )
}

export default Chart