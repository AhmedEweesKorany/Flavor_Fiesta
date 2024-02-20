import {  Table } from "../../components";

import { Avatar as MuiAvatar } from "@mui/material";
import dateFormat from "../../common/dateFormat";

const DashboardBlogs = () => {
 




  const cols = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "title",
      headerName: "Title",
      width: 350,
      headerAlign: "center",
      align: "left",
    },
    {
      field: "author",
      headerName: "Author",
      headerAlign: "center",
      align: "left",
      minWidth: 250,
      renderCell: ({ row: { author } }) => {
        return (
          <div className="flex gap-2 items-center">
            <MuiAvatar
              alt={author?.name}
              src={author?.profilePicture}
              sx={{ width: 36, height: 36 }}
              className="border-2 border-primary"
            />
            {author.name}
          </div>
        );
      },
    },
    {
      field: "createdAt",
      headerName: "Date Created",
      width: 200,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row: { createdAt } }) => {
        const formattedDate = dateFormat(createdAt);
        return <p>{formattedDate}</p>;
      },
    },
    {
      headerName: "Actions",
      headerAlign: "center",
      align: "center",
      minWidth: 250,
      renderCell: ({ row: { _id } }) => {
        return (
          <div
            className="rounded shadow-md w-[40%] text-center cursor-pointer  bg-primaryLight
            hover:bg-primary text-light py-2"
          >
            Delete
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

export default DashboardBlogs;
