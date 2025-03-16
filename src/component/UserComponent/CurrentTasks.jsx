import React from "react";

function CurrentTasks({ data }) {
    return (
        <div>
            <h2 className="text-lg font-bold mb-3">Current Tasks</h2>
            <ul className="space-y-4">
                {data.map((list, index) => (
                    <li key={index} className="flex justify-between items-center">
                        <div className="flex items-center space-x-5">
                            <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                            <div className="flex flex-col justify-start items-start">
                                <p className="text-sm text-slate-400">{list.Order.OrderId}</p>
                                <p className="text-xs text-black">{list.Order.Title}</p>
                            </div>
                        </div>
                        <p className="text-gray-500 text-sm">{list.Status === "Pending" ? "In Progress" : "Done"}</p>
                    </li>
                ))}


            </ul>
        </div>
    );
}

export default CurrentTasks;
