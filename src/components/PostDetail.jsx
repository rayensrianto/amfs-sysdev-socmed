import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getPostDetails,
  getPostComments,
  addComment,
  updateComment,
  deleteComment,
} from "../services/api";
import "../assets/styles/PostDetail.css";

const PostDetailPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ name: "", body: "" });
  const [editComment, setEditComment] = useState({
    id: null,
    name: "",
    body: "",
  });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getPostDetails(postId).then((response) => setPost(response.data));
    getPostComments(postId).then((response) => setComments(response.data));
  }, [postId]);

  const handleAddComment = () => {
    addComment({ ...newComment, postId }).then((response) =>
      setComments([...comments, response.data])
    );
  };

  const handleUpdateComment = () => {
    updateComment(editComment.id, editComment).then((response) => {
      setComments(
        comments.map((comment) =>
          comment.id === editComment.id ? response.data : comment
        )
      );
      closeModal();
    });
  };

  const handleDeleteComment = (commentId) => {
    deleteComment(commentId).then(() => {
      setComments(comments.filter((comment) => comment.id !== commentId));
    });
  };

  const openModal = (comment) => {
    setEditComment(comment);
    setShowModal(true);
  };

  const closeModal = () => {
    setEditComment({ id: null, name: "", body: "" });
    setShowModal(false);
  };

  return (
    <div className="post-detail-container">
      <div className="post-box">
        <h1>{post.title}</h1>
        <p>{post.body}</p>
      </div>
      <div className="comments-container">
        <h2>All Comments</h2>
        <ul>
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="comment-box"
              style={{
                backgroundColor: "white",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                padding: "30px",
                margin: "20px auto",
                maxWidth: "650px",
              }}
            >
              <div
                className="comment-header"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>{comment.name}</span>
                <div>
                  <button
                    onClick={() => openModal(comment)}
                    className="btn"
                    style={{ backgroundColor: "lightblue" }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteComment(comment.id)}
                    className="btn btn-delete"
                    style={{ backgroundColor: "lightcoral" }}
                  >
                    Delete
                  </button>
                </div>
              </div>
              <p>{comment.body}</p>
            </div>
          ))}
        </ul>
      </div>
      <div
        className="new-comment-container"
        style={{ textAlign: "center", marginTop: "20px" }}
      >
        <h2>Post Your Comment</h2>
        <input
          type="text"
          placeholder="Name"
          value={newComment.name}
          onChange={(e) =>
            setNewComment({ ...newComment, name: e.target.value })
          }
          className="input-field"
          style={{
            margin: "0 auto",
            marginBottom: "10px",
            width: "80%",
            height: "40px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            border: "none",
            padding: "0 10px",
          }}
        />
        <input
          type="text"
          placeholder="Body"
          value={newComment.body}
          onChange={(e) =>
            setNewComment({ ...newComment, body: e.target.value })
          }
          className="input-field"
          style={{
            margin: "0 auto",
            width: "80%",
            height: "80px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            border: "none",
            padding: "10px",
          }}
        />
        <button
          onClick={handleAddComment}
          className="btn"
          style={{ backgroundColor: "lightgreen", marginTop: "10px" }}
        >
          Submit
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="modal"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <div
            className="modal-content"
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "5px",
              maxWidth: "400px",
            }}
          >
            <span
              className="close"
              onClick={closeModal}
              style={{ cursor: "pointer", float: "right", fontSize: "20px" }}
            >
              &times;
            </span>
            <h2>Edit Comment</h2>
            <div className="input-group">
              <input
                type="text"
                placeholder="Name"
                value={editComment.name}
                onChange={(e) =>
                  setEditComment({ ...editComment, name: e.target.value })
                }
                style={{
                  margin: "0 auto",
                  marginBottom: "10px",
                  width: "80%",
                  height: "40px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  border: "none",
                  padding: "0 10px",
                }}
              />
              <textarea
                placeholder="Body"
                value={editComment.body}
                onChange={(e) =>
                  setEditComment({ ...editComment, body: e.target.value })
                }
                style={{
                  margin: "0 auto",
                  width: "80%",
                  height: "80px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  border: "none",
                  padding: "10px",
                }}
              />
            </div>
            <button
              className="update-comment-button"
              onClick={handleUpdateComment}
              style={{
                backgroundColor: "lightseagreen",
                color: "white",
                width: "80%",
                padding: "10px",
                marginTop: "10px",
                cursor: "pointer",
                margin: "0 auto",
                display: "block",
              }}
            >
              Update Comment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetailPage;
