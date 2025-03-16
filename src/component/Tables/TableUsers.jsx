import React, { useEffect, useState } from "react";
import Pagination from "../Pagination";
import { BsTrash3 } from "react-icons/bs";
import { BiSolidEditAlt } from "react-icons/bi";
import { MdOutlineLocalPhone, MdOutlineMail } from "react-icons/md";
import { format } from "date-fns";
import { login } from "../../Utils/ApiUsers";

export default function TableUsers({ tab }) {
  const [user, setUser] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [LimitData, setLimitData] = useState(10);
  const [totalItems, setTotalItems] = useState(1);
  //   const [role, setRole] = useState(tab);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchDataUser();
  }, [page, LimitData, tab, search]);

  const fetchDataUser = async () => {
    try {
      const response = await login.getAllUsers(page, LimitData, tab, search);
      setUser(response.data);
      setTotalPages(response.totalPages);
      setTotalItems(response.totalResults);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="overflow-x-auto max-h-[56vh] w-full mt-2 ">
        <table className="table table-zebra table-xs table-pin-rows table-pin-cols text-xs cursor-pointer">
          <thead className="border border-slate-200">
            <tr>
              <th className="p-3 border border-b border-slate-200 bg-slate-200 w-[5%]">
                #
              </th>
              <th className="p-3 border border-b border-slate-200 bg-slate-200 w-[20%]">
                Profile
              </th>
              <th className="p-3 border border-b border-slate-200 bg-slate-200 w-[20%]">
                Contact
              </th>
              <th className="p-3 border border-b border-slate-200 bg-slate-200 w-[20%]">
                Role
              </th>
              <th className="p-3 border border-b border-slate-200 bg-slate-200 w-[15%]">
                Join Date
              </th>
              <th className="p-3 border border-b border-slate-200 bg-slate-200 w-[10%]">
                Status
              </th>
              <th className="p-3 border border-b border-slate-200 bg-slate-200 w-[15%]">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {user.length === 0 ? (
              <tr>
                <td colSpan="7" className="py-3 px-3 text-center">
                  No data available
                </td>
              </tr>
            ) : (
              user.map((user, index) => (
                <tr key={index}>
                  <td className="py-3 px-3">{index + 1}</td>
                  <td className="py-3 px-3">
                    <div className="flex flex-row gap-x-2 justify-start items-center">
                      {user.image ? (
                        <img
                          src={user.image}
                          alt={user.name}
                          className="w-7 h-7 rounded-full"
                        />
                      ) : (
                        <div className="w-7 h-7 rounded-full bg-black flex items-center justify-center">
                          <span className="text-white font-semibold">
                            {user.Initial}
                          </span>
                        </div>
                      )}
                      <div className="flex flex-col">
                        <p className="text-slate-700 font-bold">
                          {user.UserDetail.Name}
                        </p>
                        <p className="text-slate-5400">
                          {user.UserDetail.CodeUser}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex flex-col">
                      <div className="flex flex-row justify-start items-center gap-x-2">
                        <MdOutlineMail className="text-slate-400" />
                        <p className="text-slate-700">{user.Email}</p>
                      </div>
                      <div className="flex flex-row justify-start items-center gap-x-2">
                        <MdOutlineLocalPhone className="text-slate-400" />
                        <p className="text-slate-400">
                          {user.UserDetail.PhoneNumber}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3">{user.RoleDetail.Name}</td>
                  <td className="py-3 px-3">
                    {format(new Date(user.createdAt), "dd MMMM yyyy")}
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex flex-row gap-x-2 justify-start items-center">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          user.IsActive ? "bg-success" : "bg-danger"
                        }`}
                      ></div>
                      <div className="text-xs text-success font-medium">
                        {user.IsActive ? "Active" : "InActive"}
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex flex-row gap-x-5 justify-center items-center">
                      <BiSolidEditAlt
                        //   onClick={() => handleEdit(client.Id)}
                        className="text-lg hover:text-cyan-500"
                      />
                      <BsTrash3
                        //   onClick={() => handleDelete(client.Id)}
                        className="text-lg hover:text-red-500"
                      />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="w-full">
        <Pagination
          currentPage={page} // set current page properly
          totalPages={totalPages} // adjust based on the length of data
          setPageCurrent={setPage}
          totalItem={totalItems}
          limit={LimitData}
          setLimitData={setLimitData}
        />
      </div>
    </>
  );
}
