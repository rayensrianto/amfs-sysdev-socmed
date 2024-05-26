import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getUserPosts,
  addPost,
  updatePost,
  deletePost,
} from "../services/api.jsx";
import "../assets/styles/PostPage.css";

const PostsPage = () => {
  const { userId } = useParams();
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: "", body: "" });

  useEffect(() => {
    getUserPosts(userId).then((response) => setPosts(response.data));
  }, [userId]);

  const handleAddPost = () => {
    addPost({ ...newPost, userId }).then((response) =>
      setPosts([response.data, ...posts])
    );
  };

  const handleUpdatePost = (postId) => {
    updatePost(postId, newPost).then((response) => {
      setPosts(
        posts.map((post) => (post.id === postId ? response.data : post))
      );
    });
  };

  const handleDeletePost = (postId) => {
    deletePost(postId).then(() => {
      setPosts(posts.filter((post) => post.id !== postId));
    });
  };

  return (
    <div>
      <div className="add-post-container">
        <div className="add-post-container2">
          <h2>Add New Post</h2>
          <div className="input-group">
            <textarea
              placeholder="Title"
              style={{ width: "50%", minHeight: "50px", marginRight: "10px" }}
              onChange={(e) =>
                setNewPost({ ...newPost, title: e.target.value })
              }
            />
            <textarea
              placeholder="Body"
              style={{ width: "50%", minHeight: "100px" }}
              onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
            />
          </div>
          <button className="add-post-button" onClick={handleAddPost}>
            Add Post
          </button>
        </div>
      </div>
      <div className="posts-container">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <Link to={`/post/${post.id}`} className="view-details-link">
              View Details
            </Link>
            <div className="button-container">
              <button
                className="edit-button"
                onClick={() => handleUpdatePost(post.id)}
              >
                Edit
              </button>
              <button
                className="delete-button"
                onClick={() => handleDeletePost(post.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostsPage;
