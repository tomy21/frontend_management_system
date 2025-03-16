import React from "react";

function Activity() {
    return (
        <div>
            <h2 className="text-lg font-bold mb-3">Activity</h2>
            <ul className="space-y-4">
                <li className="flex items-center space-x-2">
                    <img
                        src="https://randomuser.me/api/portraits/men/32.jpg"
                        alt="Floyd Miles"
                        className="w-10 h-10 rounded-full"
                    />
                    <div>
                        <p className="font-bold">Floyd Miles</p>
                        <p className="text-gray-500">Commented on Stark Project</p>
                        <p className="text-gray-500">10:15 AM</p>
                    </div>
                </li>
                <li className="flex items-center space-x-2">
                    <img
                        src="https://randomuser.me/api/portraits/men/33.jpg"
                        alt="Guy Hawkins"
                        className="w-10 h-10 rounded-full"
                    />
                    <div>
                        <p className="font-bold">Guy Hawkins</p>
                        <p className="text-gray-500">Added a file to 7Heroes Project</p>
                        <p className="text-gray-500">10:15 AM</p>
                    </div>
                </li>
                <li className="flex items-center space-x-2">
                    <img
                        src="https://randomuser.me/api/portraits/women/44.jpg"
                        alt="Kristin Watson"
                        className="w-10 h-10 rounded-full"
                    />
                    <div>
                        <p className="font-bold">Kristin Watson</p>
                        <p className="text-gray-500">Commented on 7Heroes Project</p>
                        <p className="text-gray-500">10:15 AM</p>
                    </div>
                </li>
            </ul>
        </div>
    );
}

export default Activity;
