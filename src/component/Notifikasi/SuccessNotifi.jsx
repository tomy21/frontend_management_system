import React, { useEffect, useState } from "react";
import { BsPatchCheck } from "react-icons/bs";

export default function SuccessNotifi({ isOpen, onClose }) {
  const [progress, setProgress] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval); // Hentikan interval ketika mencapai 100%
            if (isOpen) {
              onClose(); // Tutup modal hanya jika modal masih terbuka
            }
          }
          return prev + 10; // Tambahkan progress setiap 300ms
        });
      }, 300);

      return () => clearInterval(interval);
    }
  }, [isOpen, onClose]);

  return (
    <div>
      <div
        className="fixed top-4 right-4 z-50 animate-slide-in" // Animasi untuk modal
        style={{ animationDuration: "0.5s" }} // Durasi animasi
      >
        <div className="relative bg-white border border-green-50 shadow-inner rounded-lg p-4 w-72">
          <div className="flex flex-row justify-start items-center space-x-2">
            <BsPatchCheck size={30} className="text-green-500" />
            <h2 className="text-lg font-semibold text-gray-800">
              Success ... !
            </h2>
          </div>

          {/* Progress Bar */}
          <div className="mt-4 w-full bg-gray-200 rounded-full h-1 overflow-hidden">
            <div
              className="bg-green-500 h-1 rounded-full transition-all duration-300" // Animasi progress bar
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
