import React from "react";

function PerformanceChart() {
    return (
        <div>
            <h2 className="text-lg font-bold mb-3">Performance</h2>
            {/* Example chart placeholder */}
            <div className="flex justify-between mb-4">
                <div className="text-center">
                    <p className="font-bold">Finished</p>
                    <p className="text-green-500">18</p>
                </div>
                <div className="text-center">
                    <p className="font-bold">Tracked</p>
                    <p className="text-red-500">31h</p>
                </div>
                <div className="text-center">
                    <p className="font-bold">Efficiency</p>
                    <p className="text-green-500">93%</p>
                </div>
            </div>
            {/* Placeholder for chart */}
            <div className="bg-gray-200 h-40 rounded-md"></div>
        </div>
    );
}

export default PerformanceChart;
