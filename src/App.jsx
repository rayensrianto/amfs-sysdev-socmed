import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
} from "react-router-dom";
import "./assets/styles/Dashboard.css";
import UsersPage from "./components/User";
import PostsPage from "./components/Posts";
import PostDetail from "./components/PostDetail";
import AlbumsPage from "./components/Albums";
import AlbumsDetail from "./components/AlbumDetail";

function App() {
  return (
    <Router>
      <header className="admin-header">
        <h1>
          <Link to="/" className="dashboard-link text-white">
            Sossmedd
          </Link>
        </h1>
      </header>
      <div className="main-content">
        <div className="page-content">
          <Routes>
            <Route path="/" exact element={<UsersPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/posts/:userId" element={<PostsPage />} />
            <Route path="/post/:postId" element={<PostDetail />} />
            <Route path="/albums/:userId" element={<AlbumsPage />} />
            <Route path="/photos/:albumId" element={<AlbumsDetail />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
