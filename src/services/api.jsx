import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com";

export const getUsers = () => axios.get(`${API_URL}/users`);
export const getUserPosts = (userId) =>
  axios.get(`${API_URL}/posts`, { params: { userId } });
export const getUserAlbums = (userId) =>
  axios.get(`${API_URL}/albums`, { params: { userId } });
export const getPostDetails = (postId) =>
  axios.get(`${API_URL}/posts/${postId}`);
export const getPostComments = (postId) =>
  axios.get(`${API_URL}/posts/${postId}/comments`);
export const getAlbumPhotos = (albumId) =>
  axios.get(`${API_URL}/albums/${albumId}/photos`);
export const getPhotoDetails = (photoId) =>
  axios.get(`${API_URL}/photos/${photoId}`);
export const addPost = (post) => axios.post(`${API_URL}/posts`, post);
export const updatePost = (postId, post) =>
  axios.put(`${API_URL}/posts/${postId}`, post);
export const deletePost = (postId) =>
  axios.delete(`${API_URL}/posts/${postId}`);
export const addComment = (comment) =>
  axios.post(`${API_URL}/comments`, comment);
export const updateComment = (commentId, comment) =>
  axios.put(`${API_URL}/comments/${commentId}`, comment);
export const deleteComment = (commentId) =>
  axios.delete(`${API_URL}/comments/${commentId}`);

// New Photo API methods
export const addPhoto = (photo) => axios.post(`${API_URL}/photos`, photo);
export const updatePhoto = (photoId, photo) =>
  axios.put(`${API_URL}/photos/${photoId}`, photo);
export const deletePhoto = (photoId) =>
  axios.delete(`${API_URL}/photos/${photoId}`);
