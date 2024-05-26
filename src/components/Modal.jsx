import "../assets/styles/Modal.css";
import PropTypes from "prop-types";

const Modal = ({
  isOpen,
  closeModal,
  handleUpdatePost,
  editPost,
  setEditPost,
}) => {
  const handleChange = (field, value) => {
    setEditPost({ ...editPost, [field]: value });
  };

  return (
    isOpen && (
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
              onChange={(e) => handleChange("title", e.target.value)}
              className="modal-input"
            />
            <textarea
              placeholder="Body"
              value={editPost.body}
              onChange={(e) => handleChange("body", e.target.value)}
              className="modal-input"
            />
          </div>
          <button className="update-post-button" onClick={handleUpdatePost}>
            Update Posttttt
          </button>
        </div>
      </div>
    )
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  post: PropTypes.func.isRequired,
  handleUpdatePost: PropTypes.func.isRequired,
  editPost: PropTypes.func.isRequired,
  setEditPost: PropTypes.func.isRequired,
};

export default Modal;
