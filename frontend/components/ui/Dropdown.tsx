import React from 'react'
import { useState } from 'react'

export const Dropdown = () => {
  const[subdropdown,setsubdropdown]=useState(false)
  return (
    <div className='relative'>
    <div className='absolute'>
<button onClick={()=>{setsubdropdown(!subdropdown)}}>Set Priority</button>
{ subdropdown && <div className='flex flex-col gap-2'>
<button>High</button>
<button>Medium</button>
<button>Low</button>
</div>}
    </div></div>
  )
}
