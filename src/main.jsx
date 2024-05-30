import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard/Dashboard.jsx'
import SchoolPage from './pages/School/SchoolPage.jsx'
import SchoolDetail from './pages/School/SchoolDetail.jsx'
import InvoiceDetail from './pages/Invoice/InvoiceDetail.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<Dashboard />} />
          <Route path='/schools' element={<SchoolPage />} />
          <Route path='/schools/:id' element={<SchoolDetail />} />
          <Route path='/invoices/:invoiceId' element={<InvoiceDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)