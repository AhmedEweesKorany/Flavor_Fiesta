import { Table } from "../../components";

import { Avatar as MuiAvatar, Rating } from "@mui/material";

const DashboardRecipes = () => {
  const cols = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "title",
      headerName: "Title",
      width: 280,
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
      field: "ratings",
      headerName: "Rating",
      width: 250,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row: { ratings } }) => {
        const sumOfRatings = ratings.reduce(
          (sum, item) => sum + item.rating,
          0
        );
        const averageRating =
          sumOfRatings === 0 ? 0 : sumOfRatings / ratings.length;
        return (
          <Rating
            value={averageRating}
            readOnly={true}
            size={"medium"}
          />
        );
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

export default DashboardRecipes;
