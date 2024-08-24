import React from 'react'
import Formlogin from '../component/Formlogin'

export default function Login() {
  return (
    <div className='h-screen flex justify-center items-center m-auto'>
      <div className='bg-white shadow-md rounded-md border px-3 py-5 w-[30%]'>
        <img src="/logo_.png" width={230} alt="" />
        <h1 className='mt-5 font-semibold text-base'>Welcome back,</h1>
        <p className='text-slate-400'>Login to your account</p>

        <div className='border-b border-slate-300 w-full h-1 py-2'></div>
        <Formlogin/>
      </div>
    </div>
  )
}
