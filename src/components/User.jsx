import { useEffect, useState } from "react";
import { getUsers } from "../services/api";
import { Link } from "react-router-dom";
import "../assets/styles/Dashboard.css";
import ReactPaginate from "react-paginate";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 5; // Jumlah pengguna per halaman

  useEffect(() => {
    getUsers().then((response) => setUsers(response.data));
  }, []);

  const pageCount = Math.ceil(users.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const displayUsers = users
    .slice(pageNumber * usersPerPage, (pageNumber + 1) * usersPerPage)
    .map((user) => (
      <tr key={user.id}>
        <td>{user.name}</td>
        <td>
          <button className="action-button">
            <Link to={`/posts/${user.id}`} className="button-link">
              <i className="fas fa-newspaper"></i>Posts
            </Link>
          </button>
        </td>
        <td>
          <button className="action-button">
            <Link to={`/albums/${user.id}`} className="button-link">
              <i className="fas fa-images"></i>Albums
            </Link>
          </button>
        </td>
      </tr>
    ));

  return (
    <div className="admin-dashboard">
      <div className="admin-container">
        <main className="admin-main">
          <h2>List Of Users</h2>
          {users.length === 0 ? (
            <p>No users found.</p>
          ) : (
            <div>
              <table className="user-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th width="10%">Posts</th>
                    <th width="10%">Albums</th>
                  </tr>
                </thead>
                <tbody>{displayUsers}</tbody>
              </table>
              <br></br>
              <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={"pagination"}
                activeClassName={"active"}
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default UsersPage;
