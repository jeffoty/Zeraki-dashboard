import React from 'react'
import CollectionListItem from './CollectionListItem'

function CollectionList({ collections }) {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md my-4 w-full border-slate-200 border">
      <h2 className="font-semibold text-xl py-4">Collections</h2>
      <table className="min-w-full bg-white divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Collection No.</th>
            <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
            <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">status</th>
            <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {
            collections && collections.map(collection => (
              <CollectionListItem key={collection.id} collection={collection} />
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default CollectionList