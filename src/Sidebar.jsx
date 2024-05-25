import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

function SideBar() {
  return (
    <div className="sidebar d-flex flex-column justify-content-space-between bg-dark text-white p-4 vh-100">
      <a href="" className="text-white">
        <i className="bi bi-r-square-fill fs-5 me-2"></i>
        <span className="fs-4">Sidebar</span>
      </a>
      <hr className="text-secondary mt-2" />

      <ul className="nav nav-pills flex-column p-0 m-0">
        <li className="nav-item p-1">
          <Link to="/" className="nav-link text-white">
            <i className="bi bi-windows me-2 fs-5"></i>
            <span className="fs-5">Home</span>
          </Link>
        </li>
      </ul>

      <ul className="nav nav-pills flex-column p-0 m-0">
        <li className="nav-item p-1">
          <Link to="/users" className="nav-link text-white">
            <i className="bi bi-people me-2 fs-5"></i>
            <span className="fs-5">Users</span>
          </Link>
        </li>
      </ul>

      <ul className="nav nav-pills flex-column p-0 m-0">
        <li className="nav-item p-1">
          <a href="" className="nav-link text-white">
            <i className="bi bi-threads-fill me-2 fs-5"></i>
            <span className="fs-5">Posts</span>
          </a>
        </li>
      </ul>

      <ul className="nav nav-pills flex-column p-0 m-0">
        <li className="nav-item p-1">
          <a href="" className="nav-link text-white">
            <i className="bi bi-shop-window me-2 fs-5"></i>
            <span className="fs-5">Albums</span>
          </a>
        </li>
      </ul>

      <ul className="nav nav-pills flex-column p-0 m-0">
        <li className="nav-item p-1">
          <a href="" className="nav-link text-white">
            <i className="bi bi-rainbow me-2 fs-5"></i>
            <span className="fs-5">Photos</span>
          </a>
        </li>
      </ul>
      <div>
        <hr className="text-secondary" />
      </div>
    </div>
  );
}

export default SideBar;
