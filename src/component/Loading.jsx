import React from 'react';
import { ClipLoader } from 'react-spinners'; // Import spinner

export default function Loading() {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <ClipLoader color={"#fff"} size={50} /> {/* Spinner putih di tengah */}
        </div>
    );
}
