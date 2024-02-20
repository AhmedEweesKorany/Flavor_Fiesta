import { Table } from "../../components";
import { MdAdminPanelSettings } from "react-icons/md";
import { BiSolidUser } from "react-icons/bi";
import { RiAdminFill } from "react-icons/ri";

import { Avatar as MuiAvatar } from "@mui/material";

const Users = () => {



  const cols = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "name",
      headerName: "Name",
      headerAlign: "center",
      align: "left",
      minWidth: 250,
      renderCell: ({ row: { name, profilePicture } }) => {
        return (
          <div className="flex gap-2 items-center">
            <MuiAvatar
              alt={name}
              src={profilePicture}
              sx={{ width: 36, height: 36 }}
              className="border-2 border-primary"
            />
            {name}
          </div>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      headerAlign: "center",
      align: "left",
      minWidth: 280,
    },
    {
      field: "roles",
      headerName: "Role",
      headerAlign: "center",
      minWidth: 300,
      renderCell: ({ row: { roles } }) => {
        return (
          <div
            className={
              "rounded text-sm py-1 px-3 mx-auto w-[40%] shadow-none bg-gray-200 text-gray-700 flex items-center gap-2 justify-evenly"
            }
          >
            {roles?.includes("Admin") ? (
              <MdAdminPanelSettings />
            ) : roles?.includes("ProUser") ? (
              <RiAdminFill />
            ) : (
              <BiSolidUser />
            )}
            {roles?.includes("Admin")
              ? "Admin"
              : roles?.includes("ProUser")
              ? "Pro User"
              : "Basic User"}
          </div>
        );
      },
    },
    {
      field: "isDisabled",
      headerName: "Disabled",
      headerAlign: "center",
      align: "center",
      minWidth: 250,
      renderCell: ({ row: { isDisabled, _id } }) => {
        return (
          <div
            className={`rounded shadow-md w-[40%] py-1 text-center cursor-pointer ${
              isDisabled ? "bg-[#fad57f]" : "bg-primaryLight"
            } ${
              isDisabled ? "hover:bg-[#fad57f]" : "hover:bg-primary"
            } text-light py-2`}
          >
            {isDisabled ? "Disabled" : "Disable"}
          </div>
        );
      },
    },
  ];

  return (
    <section className="mx-auto px-6 flex justify-center items-center h-[100vh]">
      <div className="w-full h-[90%] flex justify-center items-center">
   
          <Table
            cols={cols}
          />
        
      </div>
    </section>
  );
};

export default Users;
