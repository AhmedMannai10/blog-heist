import React from 'react'

export default function Loader({show}) {
  return (
    show && 
    <div className=' border-r-slate-800 border-solid border-4
        animate-spin w-12 h-12 rounded-full 
    '></div>
  )
}
