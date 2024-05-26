import { useEffect, useState } from "react";
import { getUsers } from "../services/api";
import { Link } from "react-router-dom";
import "../assets/styles/Dashboard.css";

const UserPage = () => {
  //libs
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then((response) => setUsers(response.data));
  }, []);

  console.log(users);

  return (
    <div className="admin-dashboard">
      <div className="admin-container">
        <main className="admin-main">
          <h2>Users</h2>
          {users.length === 0 ? (
            <p>No users found.</p>
          ) : (
            <table className="user-table">
              <thead>
                <th>Name</th>
                <th>Posts</th>
                <th>Albums</th>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>
                      <Link to={`/posts/${user.id}`}>View Posts</Link>
                    </td>
                    <td>
                      <Link to={`/albums/${user.id}`}>View Albums</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </main>
      </div>
    </div>
  );
};

export default UserPage;
