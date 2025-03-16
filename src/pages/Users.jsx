import React, { useState } from "react";
import { ScaleLoader } from "react-spinners";
import TitleHeaders from "../component/TitleHeaders";
import TapTable from "../component/TapTable";
import TableUsers from "../component/Tables/TableUsers";

export default function Users() {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("All");
  const [tabValue, setTabValue] = useState("");
  const listTab = [
    { name: "All", value: "", id: 1 },
    { name: "Super Admin", value: 1, id: 1 },
    { name: "Consultant", value: 2, id: 2 },
    { name: "Marketing", value: 3, id: 3 },
    { name: "Admin", value: 4, id: 4 },
    { name: "Finance", value: 5, id: 5 },
  ];
  return (
    <>
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="flex items-center justify-center mb-3 z-30">
            <ScaleLoader size={250} color={"#ffff"} loading={true} />
          </div>
        </div>
      )}
      <TitleHeaders title={"Users"} subtitle={"Manage your user here"} />

      <TapTable
        listTab={listTab}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabPage={true}
        tabValue={tabValue}
        setTabValue={setTabValue}
      />

      <div className="w-full bg-white rounded-md flex flex-col justify-start items-center">
        <TableUsers tab={tabValue} />
      </div>
    </>
  );
}
