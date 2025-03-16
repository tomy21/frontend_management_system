import React, { useState } from "react";
import CardDashboard from "../component/Card/cardDashboard";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import ProgressBar from "../component/Card/ProgressBar";
import BoxAvatar from "../component/Card/BoxAvtar";
import { LuCalendar, LuTimer } from "react-icons/lu";
import TitleHeaders from "../component/TitleHeaders";
import CalendarEvents from "../component/Card/CalenderEvents";

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
      <TitleHeaders title={"Dashboard"} subtitle={"Manage your project here"} />

      <div className="flex justify-between items-center w-full space-x-3">
        <CardDashboard title={"Total Projects"} value={"10"} percentage={50} />
        <CardDashboard title={"Total Projects"} value={"10"} percentage={50} />
        <CardDashboard title={"Total Projects"} value={"10"} percentage={50} />
        <CardDashboard title={"Total Projects"} value={"10"} percentage={50} />
      </div>

      <CalendarEvents />
    </>
  );
}
