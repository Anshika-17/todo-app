import React from 'react'

export const Navbar = () => {
  return (
    <nav className='flex justify-between bg-slate-700 text-white'>
        <div className="logo">
            <span className='font-bold text-xl mx-8'>Todo</span>
        </div>
        <ul className="flex gap-8 mx-8">
            <li className='cursor-pointer'>Home</li>
            <li className='cursor-pointer'>Your Task</li>
        </ul>
    </nav>
  

  )
}

export default Navbar