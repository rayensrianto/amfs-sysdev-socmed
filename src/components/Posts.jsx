import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getUserPosts,
  addPost,
  updatePost,
  deletePost,
} from "../services/api.jsx";
import "../assets/styles/PostPage.css";
import ReactPaginate from "react-paginate";
import "../assets/styles/Modal.css";

const PostsPage = () => {
  const { userId } = useParams();
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: "", body: "" });
  const [editPost, setEditPost] = useState({ id: null, title: "", body: "" });
  const [showModal, setShowModal] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const postsPerPage = 4;

  useEffect(() => {
    getUserPosts(userId).then((response) => setPosts(response.data));
  }, [userId]);

  const pageCount = Math.ceil(posts.length / postsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const handleAddPost = () => {
    addPost({ ...newPost, userId }).then((response) =>
      setPosts([response.data, ...posts])
    );
  };

  const handleUpdatePost = () => {
    updatePost(editPost.id, editPost).then((response) => {
      setPosts(
        posts.map((post) => (post.id === editPost.id ? response.data : post))
      );
      closeModal();
    });
  };

  const handleDeletePost = (postId) => {
    deletePost(postId).then(() => {
      setPosts(posts.filter((post) => post.id !== postId));
    });
  };

  const openModal = (postId) => {
    const post = posts.find((post) => post.id === postId);
    setEditPost(post);
    setShowModal(true);
  };

  const closeModal = () => {
    setEditPost({ id: null, title: "", body: "" });
    setShowModal(false);
  };

  const displayPosts = posts
    .slice(pageNumber * postsPerPage, (pageNumber + 1) * postsPerPage)
    .map((post) => (
      <div key={post.id} className="post-card">
        <h3>{post.title}</h3>
        <p>{post.body}</p>
        <Link to={`/post/${post.id}`} className="view-details-link">
          View Details
        </Link>
        <div className="button-container">
          <div>
            <button className="edit-button" onClick={() => openModal(post.id)}>
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
      </div>
    ));

  return (
    <div>
      <div className="add-post-container">
        <div className="add-post-container2">
          <h2>Post</h2>
          <div className="input-group">
            <textarea
              placeholder="Title"
              style={{
                width: "calc(100% - 80px)",
                minHeight: "50px",
                marginBottom: "10px",
                marginRight: "10px",
                border: "none",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
              }}
              onChange={(e) =>
                setNewPost({ ...newPost, title: e.target.value })
              }
            />
            <textarea
              placeholder="Body"
              style={{
                width: "calc(100% - 80px)",
                minHeight: "100px",
                marginBottom: "10px",
                border: "none",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
              }}
              onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
            />
          </div>
          <button
            className="add-post-button"
            style={{
              width: "100px",
              height: "40px",
              alignSelf: "flex-end",
              marginRight: "10px",
              boxShadow:
                "0px 4px 8px rgba(0, 0, 0, 0.2)" /* Adjust shadow size */,
            }}
            onClick={handleAddPost}
          >
            Save
          </button>
        </div>
      </div>
      <div className="posts-container">{displayPosts}</div>
      {/* Pagination */}
      <div className="pagination-container">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      </div>
      {/* Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>Edit Post</h2>
            <div className="input-group">
              <input
                type="text"
                placeholder="Title"
                value={editPost.title}
                onChange={(e) =>
                  setEditPost({ ...editPost, title: e.target.value })
                }
                className="modal-input"
              />
              <textarea
                placeholder="Body"
                value={editPost.body}
                onChange={(e) =>
                  setEditPost({ ...editPost, body: e.target.value })
                }
                className="modal-input"
              />
            </div>
            <button className="update-post-button" onClick={handleUpdatePost}>
              Update Post
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostsPage;
