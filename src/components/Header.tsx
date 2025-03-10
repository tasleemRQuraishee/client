

import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'



const Header = () => {
  return (
    <nav className='w-full h-[60px] bg-gray-900 text-white p-3 flex justify-between items-center'>
    <Link to = "/"><h2 className='font-bold select-none'>WB compiler</h2></Link>
    <ul>
      <li>
        <Link to="/compiler"><Button variant={'secondary'}>Compiler</Button></Link>
      </li>
    </ul>
    </nav>
  )
}

export default Header