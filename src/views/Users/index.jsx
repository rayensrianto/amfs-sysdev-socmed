import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";

const Users = () => {
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );
        console.log("response", response);
        setFilteredUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, []);

  const columns = [
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Body",
      selector: (row) => row.body,
    },
  ];

  return (
    <div className="container my-5">
      <DataTable
        columns={columns}
        data={filteredUsers}
        fixedHeader
        title="React-Data-Table-Component Tutorial."
        pagination
      />
    </div>
  );
};

export default Users;
