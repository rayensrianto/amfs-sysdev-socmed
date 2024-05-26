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

  useEffect(() => {
    getPostDetails(postId).then((response) => setPost(response.data));
    getPostComments(postId).then((response) => setComments(response.data));
  }, [postId]);

  const handleAddComment = () => {
    addComment({ ...newComment, postId }).then((response) =>
      setComments([...comments, response.data])
    );
  };

  const handleUpdateComment = (commentId) => {
    updateComment(commentId, newComment).then((response) => {
      setComments(
        comments.map((comment) =>
          comment.id === commentId ? response.data : comment
        )
      );
    });
  };

  const handleDeleteComment = (commentId) => {
    deleteComment(commentId).then(() => {
      setComments(comments.filter((comment) => comment.id !== commentId));
    });
  };

  return (
    <div className="post-detail-container">
      <div className="post-box">
        <h1>{post.title}</h1>
        <p>{post.body}</p>
      </div>
      <div className="comments-container">
        <h2>Comments</h2>
        <ul>
          {comments.map((comment) => (
            <div key={comment.id} className="comment-box">
              <div className="comment-header">
                <span>{comment.name}</span>
                <div>
                  <button
                    onClick={() => handleUpdateComment(comment.id)}
                    className="btn"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteComment(comment.id)}
                    className="btn btn-delete"
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
      <div className="new-comment-container">
        <h2>Add New Comment</h2>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) =>
            setNewComment({ ...newComment, name: e.target.value })
          }
          className="input-field"
        />
        <input
          type="text"
          placeholder="Body"
          onChange={(e) =>
            setNewComment({ ...newComment, body: e.target.value })
          }
          className="input-field"
        />
        <button onClick={handleAddComment} className="btn">
          Add Comment
        </button>
      </div>
    </div>
  );
};

export default PostDetailPage;
