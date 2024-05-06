import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import logo from '@/public/img/Logo.svg'

const Navbar = () => {
  
  return (
    <div className='admin-navbar-box flex items-center justify-between px-12 py-2 shadow-md shadow-gray-300'>
      <Link href="/admin">
        <Image src={logo} alt='logo-itavi-mining-compony' width={60} height={60} className="select-none" />
      </Link>
      <div className="admin-tabs flex items-center justify-end gap-4 font-medium">
        <Link href="/admin/contact">Contact</Link>
        <Link href="/admin/newsletter">Newsletter</Link>
      </div>
    </div>
  )
}

export default Navbar
