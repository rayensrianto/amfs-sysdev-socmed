import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );
        console.log("response", response);
        setUsers(response.data);
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
    {
      name: "Action",
      cell: (row) => (
        <button
          className="btn btn-primary"
          onClick={() => alert(row.alpha2Code)}
        >
          Edit
        </button>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={filteredUsers}
      pagination
      //   fixedHeader
      //   fixedHeaderScrollHeight="450px"
      //   selectableRows
      //   selectableRowsHighlight
      highlightOnHover
      // actions={<button className='btn btn-sm btn-info'>Export</button>}
      //   subHeader
    //   subHeaderComponent={
    //     <input
    //       type="text"
    //       placeholder="Search here"
    //       className="w-25 form-control"
    //       value={search}
    //       onChange={(e) => setSearch(e.target.value)}
    //     />
    //   }
      //   subHeaderAlign="right"
    />
  );
};

export default Users;
