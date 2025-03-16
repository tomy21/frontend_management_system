import React, { useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/id";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";

dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.locale("id");

export default function CalendarEvents() {
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );

  // Data Event
  const events = [
    {
      date: "2024-03-23",
      title: "UK Planning Meeting",
      time: "08:00 AM - 11:30 AM",
      members: 35,
      color: "bg-yellow-500",
      avatars: ["👨‍💼", "👩‍💼", "🧑‍💼"],
    },
    {
      date: "2024-03-23",
      title: "Development Team Plan",
      time: "06:20 AM - 10:15 AM",
      members: 36,
      color: "bg-green-500",
      avatars: ["👨‍💻", "👩‍💻"],
    },
    {
      date: "2024-03-23",
      title: "Get Together Party",
      time: "10:30 PM - 12:00 AM",
      members: 27,
      color: "bg-purple-500",
      avatars: ["🎉", "🍻", "💃"],
    },
    {
      date: "2024-03-15",
      title: "Team Meeting",
      time: "01:00 PM - 02:30 PM",
      members: 12,
      color: "bg-red-500",
      avatars: ["📊", "📅"],
    },
  ];

  const today = dayjs();
  const startOfMonth = today.startOf("month");
  const daysInMonth = today.daysInMonth();
  const startDay = startOfMonth.day();

  // Nama hari dalam bahasa Indonesia
  const daysOfWeek = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

  // Membuat array kalender dengan padding sebelum tanggal 1
  const calendarDays = [
    ...Array(startDay).fill(null), // Padding kosong sebelum tanggal 1
    ...Array.from({ length: daysInMonth }, (_, i) =>
      startOfMonth.add(i, "day")
    ),
  ];

  // Filter event berdasarkan tanggal yang dipilih
  const filteredEvents = events.filter(
    (event) => dayjs(event.date).format("YYYY-MM-DD") === selectedDate
  );

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg">
      {/* Header Kalender */}
      <div className="text-center mb-4">
        <h2 className="text-lg font-semibold">{today.format("MMMM YYYY")}</h2>
        <div className="grid grid-cols-7 gap-1 text-gray-600 font-bold mt-2">
          {daysOfWeek.map((day) => (
            <div key={day} className="text-xs">
              {day}
            </div>
          ))}
        </div>
      </div>

      {/* Kalender */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((date, index) => (
          <button
            key={index}
            disabled={!date}
            onClick={() => date && setSelectedDate(date.format("YYYY-MM-DD"))}
            className={`p-2 text-sm font-medium rounded-full ${
              date && selectedDate === date.format("YYYY-MM-DD")
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200"
            }`}
          >
            {date ? date.date() : ""}
          </button>
        ))}
      </div>

      {/* Event List */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Today's Events</h3>
        {filteredEvents.length === 0 ? (
          <p className="text-gray-500">Tidak ada acara untuk tanggal ini.</p>
        ) : (
          filteredEvents.map((event, idx) => (
            <div key={idx} className="flex items-center space-x-3 p-2 border-b">
              <div className={`w-3 h-3 rounded-full ${event.color}`} />
              <div className="flex-1">
                <h4 className="text-sm font-semibold">{event.title}</h4>
                <p className="text-xs text-gray-500">{event.time}</p>
              </div>
              <div className="flex -space-x-1">
                {event.avatars.map((emoji, i) => (
                  <span
                    key={i}
                    className="w-6 h-6 flex items-center justify-center bg-gray-300 rounded-full text-sm"
                  >
                    {emoji}
                  </span>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
