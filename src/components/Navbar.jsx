import React from 'react'

export const Navbar = () => {
  return (
    <nav className='flex justify-between bg-violet-900  text-white py-2'>
        <div className="logo">
            <span className='font-bold text-xl mx-8 '>Todo</span>
        </div>
        <ul className="flex gap-8 mx-8">
            <li className='cursor-pointer hover:font-bold transition-all '>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all '>Your Task</li>
        </ul>
    </nav>
  

  )
}

export default Navbar