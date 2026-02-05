import React from 'react'
import { Icon } from '@iconify/react'

const Loader = () => {
  return (
    <div className='flex gap-5 justify-center'>
<div className='font-serif text-6xl '>Loading</div>

<Icon icon="codex:loader" className='text-7xl' />

    </div>
  )
}

export default Loader