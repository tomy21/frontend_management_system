import React from 'react'
import { AiOutlineCloudDownload } from 'react-icons/ai'
import { BsTrash3 } from 'react-icons/bs'
import { IoIosAddCircleOutline } from 'react-icons/io'
import { LuClipboardEdit, LuFilter } from 'react-icons/lu'
import { MdOutlineLocalPhone, MdOutlineMail } from 'react-icons/md'

export default function Location() {
  return (
    <div className='px-7 py-2'>
      <h1 className="text-xl font-bold mb-2">
        Master Location
      </h1>
      <div className="flex justify-between items-center mt-7">
        <input type="search" name="search" id="search" className='border border-slate-300 rounded-md px-2 py-3 text-xs w-72' placeholder='Search' />

        <div className="flex flex-row space-x-3 justify-center items-center">
          <button className='flex flex-row space-x-2 text-sm text-sky-500 border-slate-400 justify-center items-center'>
            <IoIosAddCircleOutline />
            <p>Add Client</p>
          </button>
          <button className='flex flex-row space-x-2 text-sm text-emerald-500 px-5 border-r border-slate-400 justify-center items-center'>
            <AiOutlineCloudDownload />
            <p>Export</p>
          </button>
          <button className='flex flex-row space-x-2 text-sm text-emerald-500 border-slate-400 justify-center items-center'>
            <LuFilter />
            <p>Filter</p>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto max-h-[56vh] w-full mt-2 ">
        <table className='table table-zebra table-xs table-pin-rows table-pin-cols text-xs cursor-pointer'>
          <thead className='border border-slate-200'>
            <tr>
              <th className='p-3 border-r border-b border-slate-200 w-[5%]'>#</th>
              <th className='p-3 border-r border-b border-slate-200 w-[20%]'>Location</th>
              <th className='p-3 border-r border-b border-slate-200 w-[20%]'>Longitude</th>
              <th className='p-3 border-r border-b border-slate-200 w-[20%]'>Latitude</th>
              <th className='p-3 border-r border-b border-slate-200 w-[15%]'>Create Date</th>
              <th className='p-3 border-r border-b border-slate-200 w-[10%]'>Status</th>
              <th className='p-3 border-b border-slate-200 w-[15%]'>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='py-3 px-3'>1</td>
              <td className='py-3 px-3'>ST/CM/MM/00001/MS/MC</td>
              <td className='py-3 px-3'>
                <div className="flex flex-row gap-x-2 justify-start items-center">
                  <div className="w-7 h-7 rounded-full bg-black"></div>
                  <div className='flex flex-col'>
                    <p className='text-slate-700'>Nama Client</p>
                    <p className='text-slate-400'>webiste client</p>
                  </div>
                </div>
              </td>
              <td className='py-3 px-3'>
                <div className='flex flex-col'>
                  <div className="flex flex-row justify-start items-center gap-x-2">
                    <MdOutlineMail className='text-slate-400' />
                    <p className='text-slate-700'>client@email.com</p>
                  </div>
                  <div className="flex flex-row justify-start items-center gap-x-2">
                    <MdOutlineLocalPhone className='text-slate-400' />
                    <p className='text-slate-400'>+62 812-9222-1111</p>
                  </div>
                </div>
              </td>

              <td className='py-3 px-3'>IDR 3 mio</td>
              <td className='py-3 px-3'>
                <div className='bg-cyan-100 text-cyan-600 p-1 text-center rounded-full'>Active</div>
              </td>
              <td>
                <div className="flex flex-row gap-x-3 justify-center items-center">
                  <BsTrash3 className='text-lg hover:text-red-500' />
                  <LuClipboardEdit className='text-lg hover:text-cyan-500' />
                </div>
              </td>
            </tr>
            <tr>
              <td className='py-3 px-3'>1</td>
              <td className='py-3 px-3'>ST/CM/MM/00001/MS/MC</td>
              <td className='py-3 px-3'>
                <div className="flex flex-row gap-x-2 justify-start items-center">
                  <div className="w-7 h-7 rounded-full bg-black"></div>
                  <div className='flex flex-col'>
                    <p className='text-slate-700'>Nama Client</p>
                    <p className='text-slate-400'>webiste client</p>
                  </div>
                </div>
              </td>
              <td className='py-3 px-3'>
                <div className='flex flex-col'>
                  <div className="flex flex-row justify-start items-center gap-x-2">
                    <MdOutlineMail className='text-slate-400' />
                    <p className='text-slate-700'>client@email.com</p>
                  </div>
                  <div className="flex flex-row justify-start items-center gap-x-2">
                    <MdOutlineLocalPhone className='text-slate-400' />
                    <p className='text-slate-400'>+62 812-9222-1111</p>
                  </div>
                </div>
              </td>

              <td className='py-3 px-3'>IDR 3 mio</td>
              <td className='py-3 px-3'>
                <div className='bg-red-100 text-red-600 p-1 text-center rounded-full'>Non Active</div>
              </td>
              <td>
                <div className="flex flex-row gap-x-3 justify-center items-center">
                  <BsTrash3 className='text-lg hover:text-red-500' />
                  <LuClipboardEdit className='text-lg hover:text-cyan-500' />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
