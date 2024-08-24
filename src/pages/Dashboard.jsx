import React, { useState } from 'react'
import CardDashboard from '../component/Card/cardDashboard'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import ProgressBar from '../component/Card/ProgressBar';
import BoxAvatar from '../component/Card/BoxAvtar';
import { LuCalendar, LuTimer } from 'react-icons/lu';

export default function Dashboard() {
  const [progress, setProgress] = useState(0);

  const handleChange = (event) => {
    const value = event.target.value;
    if (value >= 0 && value <= 100) {
      setProgress(value);
    }
  };

  return (
    <>
      <h1 className='py-2'>Dashboard</h1>
      <div className="flex flex-row justify-start items-start w-full">
        <div className="flex flex-col w-full min-h-screen ">
          <div className="flex justify-between items-start">
            <CardDashboard title={"Total Project"} value={300} percentage={30} />
            <CardDashboard title={"Done"} value={300} percentage={30} />
            <CardDashboard title={"On Hold"} value={300} percentage={30} />
            <CardDashboard title={"Reject"} value={300} percentage={30} />
          </div>

          <div className="flex flex-col justify-start items-start w-full bg-white rounded-md mt-5">
            <div className="flex justify-between items-center w-full">
              <h1 className='text-base font-semibold'>List Project</h1>
              <h1 className='text-base text-slate-400'>View all</h1>
            </div>

            <div className="flex flex-wrap gap-2 items-center w-full mt-5">
              <div className="flex flex-col justify-start items-start w-[23rem] h-44 border border-slate-400 rounded-md p-2">
                <h1 className='text-sm font-semibold'>Training Six sigma</h1>
                <p className='text-[10px] font-normal text-slate-400 mt-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam repellat architecto natus qui quasi illo a maxime cum porro quibusdam!</p>

                <div className="flex flex-row justify-start items-center w-full space-x-2 mt-3">
                  <div className="w-full bg-gray-700 h-2 rounded">
                    <div
                      className="bg-green-500 h-2 rounded"
                      style={{ width: "75%" }}
                    ></div>
                  </div>
                  <h1>75%</h1>
                </div>

                <div className="flex justify-between items-center w-full">
                  <BoxAvatar />
                  <div className='flex flex-row justify-center items-center space-x-2 p-2 rounded-md bg-yellow-100 text-yellow-500 text-xs'>
                    <LuTimer />
                    <p>3 Days Left</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-start items-start w-[23rem] h-44 border border-slate-400 rounded-md p-2">
                <h1 className='text-sm font-semibold'>Training Six sigma</h1>
                <p className='text-[10px] font-normal text-slate-400 mt-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam repellat architecto natus qui quasi illo a maxime cum porro quibusdam!</p>

                <div className="flex flex-row justify-start items-center w-full space-x-2 mt-3">
                  <div className="w-full bg-gray-700 h-2 rounded">
                    <div
                      className="bg-green-500 h-2 rounded"
                      style={{ width: "75%" }}
                    ></div>
                  </div>
                  <h1>75%</h1>
                </div>

                <div className="flex justify-between items-center w-full">
                  <BoxAvatar />
                  <div className='flex flex-row justify-center items-center space-x-2 p-2 rounded-md bg-yellow-100 text-yellow-500 text-xs'>
                    <LuTimer />
                    <p>3 Days Left</p>
                  </div>
                </div>

              </div>
              <div className="flex flex-col justify-start items-start w-[23rem] h-44 border border-slate-400 rounded-md p-2">
                <h1 className='text-sm font-semibold'>Training Six sigma</h1>
                <p className='text-[10px] font-normal text-slate-400 mt-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam repellat architecto natus qui quasi illo a maxime cum porro quibusdam!</p>

                <div className="flex flex-row justify-start items-center w-full space-x-2 mt-3">
                  <div className="w-full bg-gray-700 h-2 rounded">
                    <div
                      className="bg-green-500 h-2 rounded"
                      style={{ width: "75%" }}
                    ></div>
                  </div>
                  <h1>75%</h1>
                </div>

                <div className="flex justify-between items-center w-full">
                  <BoxAvatar />
                  <div className='flex flex-row justify-center items-center space-x-2 p-2 rounded-md bg-yellow-100 text-yellow-500 text-xs'>
                    <LuTimer />
                    <p>3 Days Left</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-start items-start w-[23rem] h-44 border border-slate-400 rounded-md p-2">
                <h1 className='text-sm font-semibold'>Training Six sigma</h1>
                <p className='text-[10px] font-normal text-slate-400 mt-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam repellat architecto natus qui quasi illo a maxime cum porro quibusdam!</p>

                <div className="flex flex-row justify-start items-center w-full space-x-2 mt-3">
                  <div className="w-full bg-gray-700 h-2 rounded">
                    <div
                      className="bg-green-500 h-2 rounded"
                      style={{ width: "75%" }}
                    ></div>
                  </div>
                  <h1>75%</h1>
                </div>

                <div className="flex justify-between items-center w-full">
                  <BoxAvatar />
                  <div className='flex flex-row justify-center items-center space-x-2 p-2 rounded-md bg-yellow-100 text-yellow-500 text-xs'>
                    <LuTimer />
                    <p>3 Days Left</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-start items-start w-full bg-white rounded-md mt-5">
            <div className="flex justify-between items-center w-full">
              <h1 className='text-base font-semibold'>Upcoming Project</h1>
              <h1 className='text-base text-slate-400'>View all</h1>
            </div>
            <div className="flex flex-wrap gap-2 items-center w-full mt-5">
              <div className="flex flex-col justify-start items-start w-[23rem] h-36 border border-slate-400 rounded-md p-2">
                <h1 className='text-sm font-semibold'>Training Six sigma</h1>


                <div className="flex flex-row justify-start items-center w-full space-x-2 mt-3">
                  <div className="w-full bg-gray-700 h-2 rounded">
                    <div
                      className="bg-green-500 h-2 rounded"
                      style={{ width: "75%" }}
                    ></div>
                  </div>
                  <h1>75%</h1>
                </div>

                <div className="flex justify-between items-center w-full mt-2">
                  <BoxAvatar />
                  <div className='flex flex-row justify-center items-center space-x-2 p-2 text-xs'>
                    <LuCalendar />
                    <p>21 July 2024</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-start items-start w-[23rem] h-36 border border-slate-400 rounded-md p-2">
                <h1 className='text-sm font-semibold'>Training Six sigma</h1>


                <div className="flex flex-row justify-start items-center w-full space-x-2 mt-3">
                  <div className="w-full bg-gray-700 h-2 rounded">
                    <div
                      className="bg-green-500 h-2 rounded"
                      style={{ width: "75%" }}
                    ></div>
                  </div>
                  <h1>75%</h1>
                </div>

                <div className="flex justify-between items-center w-full mt-2">
                  <BoxAvatar />
                  <div className='flex flex-row justify-center items-center space-x-2 p-2 text-xs'>
                    <LuCalendar />
                    <p>21 July 2024</p>
                  </div>
                </div>

              </div>
              <div className="flex flex-col justify-start items-start w-[23rem] h-36 border border-slate-400 rounded-md p-2">
                <h1 className='text-sm font-semibold'>Training Six sigma</h1>


                <div className="flex flex-row justify-start items-center w-full space-x-2 mt-3">
                  <div className="w-full bg-gray-700 h-2 rounded">
                    <div
                      className="bg-green-500 h-2 rounded"
                      style={{ width: "75%" }}
                    ></div>
                  </div>
                  <h1>75%</h1>
                </div>

                <div className="flex justify-between items-center w-full mt-2">
                  <BoxAvatar />
                  <div className='flex flex-row justify-center items-center space-x-2 p-2 text-xs'>
                    <LuCalendar />
                    <p>21 July 2024</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-start items-start w-[23rem] h-36 border border-slate-400 rounded-md p-2">
                <h1 className='text-sm font-semibold'>Training Six sigma</h1>


                <div className="flex flex-row justify-start items-center w-full space-x-2 mt-3">
                  <div className="w-full bg-gray-700 h-2 rounded">
                    <div
                      className="bg-green-500 h-2 rounded"
                      style={{ width: "75%" }}
                    ></div>
                  </div>
                  <h1>75%</h1>
                </div>

                <div className="flex justify-between items-center w-full mt-2">
                  <BoxAvatar />
                  <div className='flex flex-row justify-center items-center space-x-2 p-2 text-xs'>
                    <LuCalendar />
                    <p>21 July 2024</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-[20rem] min-h-screen bg-red-50">

        </div>
      </div>
    </>
  )
}
