import React from 'react'
import Navbar from './Navbar'

const Layout = ({ children }: any) => {
  return (
    <div>
      <Navbar />
      <div className='px-12 py-6'>
        {children}
      </div>
    </div>
  )
}

export default Layout
