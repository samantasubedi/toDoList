import React from 'react'
import { useState } from 'react'

export const Dropdown = () => {
  const[subdropdown,setsubdropdown]=useState(false)
  return (
    <div className='relative z-10'>
    <div className='absolute'>
<button className='bg-white p-3 rounded-xl w-40' onClick={()=>{setsubdropdown(!subdropdown)}}>Set Priority</button>
{ subdropdown && <div className='flex flex-col gap-2 bg-gray-200 p-2 rounded-xl'>
<button className='bg-red-400 text-white rounded-md'>High</button>
<button className='bg-amber-400 text-white rounded-md'>Medium </button>
<button className='bg-emerald-400 text-white rounded-md'>Low</button>
</div>}
    </div></div>
  )
}
