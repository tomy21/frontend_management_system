import React from 'react'
import { AiOutlineRise } from 'react-icons/ai'

export default function CardDashboard({title, value, percentage}) {
    return (
        <>
            <div className="flex flex-col justify-start items-start border border-slate-300 rounded-md w-40 h-24 px-3 py-2">
                <h1 className='text-sm font-medium text-gray-400'>{title}</h1>
                <div className="flex justify-between items-center w-full mt-2">
                    <h1 className='text-lg font-semibold'>{value}</h1>
                    <div className="flex flex-row justify-center items-center space-x-3 bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs">
                        <AiOutlineRise />
                        <p>{percentage}%</p>
                    </div>
                </div>
                <h1 className='mt-2 text-[10px] text-slate-400'>Last update 18 July 2023</h1>
            </div>
        </>
    )
}
