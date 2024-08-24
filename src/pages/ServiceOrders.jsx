import React from 'react'
import { AiOutlineCloudDownload } from 'react-icons/ai'
import { IoIosAddCircleOutline } from 'react-icons/io'
import { LuFilter } from 'react-icons/lu'
import { MdOutlineLocalPhone, MdOutlineMail } from 'react-icons/md'

export default function ServiceOrders() {
  return (
    <div className='px-7 py-2'>
      <h1 className="text-xl font-bold">Service Orders</h1>

      <div className='flex flex-row justify-between items-center mt-3'>
        <div className="flex flex-row w-[50%] justify-center items-center border border-slate-300 px-5 py-3 rounded-md">
          <div className="flex flex-col w-full space-y-5">
            <h1 className='text-sm font-medium'>Total Orders</h1>
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-y-2">
                <h1 className='text-lg font-semibold'>30 <span className='text-xs font-medium text-slate-500'>Orders</span></h1>
                <div className="flex flex-row justify-start items-center gap-x-2">
                  <div className='w-2 h-2 bg-cyan-600 rounded-full'></div>
                  <div className="text-xs text-success font-medium">Followup</div>
                </div>
              </div>
              <div className="flex flex-col gap-y-2 border-l pl-7 border-slate-300">
                <h1 className='text-lg font-semibold'>30 <span className='text-xs font-medium text-slate-500'>Orders</span></h1>
                <div className="flex flex-row justify-start items-center gap-x-2">
                  <div className='w-2 h-2 bg-amber-600 rounded-full'></div>
                  <div className="text-xs text-success font-medium">On Progress</div>
                </div>
              </div>
              <div className="flex flex-col gap-y-2 border-r border-l px-10 ">
                <h1 className='text-lg font-semibold'>30 <span className='text-xs font-medium text-slate-500'>Orders</span></h1>
                <div className="flex flex-row justify-start items-center gap-x-2">
                  <div className='w-2 h-2 bg-red-600 rounded-full'></div>
                  <div className="text-xs text-success font-medium">Reject</div>
                </div>
              </div>
              <div className="flex flex-col gap-y-2">
                <h1 className='text-lg font-semibold'>30 <span className='text-xs font-medium text-slate-500'>Orders</span></h1>
                <div className="flex flex-row justify-start items-center gap-x-2">
                  <div className='w-2 h-2 bg-success rounded-full'></div>
                  <div className="text-xs text-success font-medium">Done</div>
                </div>
              </div>
            </div>
            <div className="text-xs text-sky-500">Last update <span className='font-semibold '>23 may 2024 18:00</span></div>
          </div>
        </div>

        <div className="flex flex-row w-[22%] justify-between items-center border border-slate-300 px-5 py-3 rounded-md">
          <div className="flex flex-col w-full space-y-5">
            <h1 className='text-sm font-medium'>Total Client</h1>
            <div className="flex justify-between items-center">
              <div className="flex justify-between items-center w-full">
                <h1 className='text-2xl font-semibold'>30</h1>
                <div className="flex flex-row justify-start items-center gap-x-2">
                  <div className='w-2 h-2 bg-success rounded-full'></div>
                  <div className="text-xs text-success font-medium">Accepted</div>
                </div>
              </div>

            </div>
            <div className="text-xs text-sky-500">Last update <span className='font-semibold '>23 may 2024 18:00</span></div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-10">
        <input type="search" name="search" id="search" className='border border-slate-300 rounded-md px-2 py-3 text-xs w-72' placeholder='Search' />

        <div className="flex flex-row space-x-3 justify-center items-center">
          <button className='flex flex-row space-x-2 text-sm text-sky-500 border-slate-400 justify-center items-center'>
            <IoIosAddCircleOutline />
            <p>Add Order</p>
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

      <div className="overflow-x-auto max-h-[56vh] w-full mt-3 ">
        <table className='table table-zebra table-xs table-pin-rows table-pin-cols text-xs cursor-pointer'>
          <thead className='border border-slate-200'>
            <tr>
              <th className='p-3 border-r border-b border-slate-200 w-[5%]'>#</th>
              <th className='p-3 border-r border-b border-slate-200 w-[20%]'>Code Orders</th>
              <th className='p-3 border-r border-b border-slate-200 w-[20%]'>Contact</th>
              <th className='p-3 border-r border-b border-slate-200 w-[15%]'>Client</th>
              <th className='p-3 border-r border-b border-slate-200 w-[10%]'>Status</th>
              <th className='p-3 border-b border-slate-200 w-[15%]'>Estimate Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='py-3 px-3'>1</td>
              <td className='py-3 px-3'>ST/CM/MM/00001/MS/MC</td>
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
                <div className='bg-cyan-100 text-cyan-600 p-1 text-center rounded-full'>Follow up</div>
              </td>
              <td className='py-3 px-3'>IDR 3 mio</td>
            </tr>
            <tr>
              <td className='py-3 px-3'>2</td>
              <td className='py-3 px-3'>ST/CM/MM/00002/MS/MC</td>
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
                <div className='bg-amber-100 text-amber-600 p-1 text-center rounded-full'>Pending</div>
              </td>
              <td className='py-3 px-3'>IDR 3 mio</td>
            </tr>
            <tr>
              <td className='py-3 px-3'>3</td>
              <td className='py-3 px-3'>ST/CM/MM/00003/MS/MC</td>
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
                <div className='bg-purple-100 text-purple-600 p-1 text-center rounded-full'>Accepted</div>
              </td>
              <td className='py-3 px-3'>IDR 3 mio</td>
            </tr>
            <tr>
              <td className='py-3 px-3'>4</td>
              <td className='py-3 px-3'>ST/CM/MM/00004/MS/MC</td>
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
                <div className='bg-slate-300 text-slate-600 p-1 text-center rounded-full'>On Progress</div>
              </td>
              <td className='py-3 px-3'>IDR 3 mio</td>
            </tr>
            <tr>
              <td className='py-3 px-3'>5</td>
              <td className='py-3 px-3'>ST/CM/MM/00005/MS/MC</td>
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
                <div className='bg-red-100 text-red-600 p-1 text-center rounded-full'>Reject</div>
              </td>
              <td className='py-3 px-3'>IDR 3 mio</td>
            </tr>
            <tr>
              <td className='py-3 px-3'>6</td>
              <td className='py-3 px-3'>ST/CM/MM/00006/MS/MC</td>
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
                <div className='bg-emerald-100 text-emerald-600 p-1 text-center rounded-full'>Done</div>
              </td>
              <td className='py-3 px-3'>IDR 3 mio</td>
            </tr>
            <tr>
              <td className='py-3 px-3'>7</td>
              <td className='py-3 px-3'>ST/CM/MM/00001/MS/MC</td>
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
                <div className='bg-cyan-100 text-cyan-600 p-1 text-center rounded-full'>Follow up</div>
              </td>
              <td className='py-3 px-3'>IDR 3 mio</td>
            </tr>
            <tr>
              <td className='py-3 px-3'>8</td>
              <td className='py-3 px-3'>ST/CM/MM/00001/MS/MC</td>
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
                <div className='bg-cyan-100 text-cyan-600 p-1 text-center rounded-full'>Follow up</div>
              </td>
              <td className='py-3 px-3'>IDR 3 mio</td>
            </tr>
            <tr>
              <td className='py-3 px-3'>9</td>
              <td className='py-3 px-3'>ST/CM/MM/00001/MS/MC</td>
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
                <div className='bg-cyan-100 text-cyan-600 p-1 text-center rounded-full'>Follow up</div>
              </td>
              <td className='py-3 px-3'>IDR 3 mio</td>
            </tr>
            <tr>
              <td className='py-3 px-3'>10</td>
              <td className='py-3 px-3'>ST/CM/MM/00001/MS/MC</td>
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
                <div className='bg-cyan-100 text-cyan-600 p-1 text-center rounded-full'>Follow up</div>
              </td>
              <td className='py-3 px-3'>IDR 3 mio</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
