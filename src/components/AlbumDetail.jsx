import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  getAlbumPhotos,
  addPhoto,
  updatePhoto,
  deletePhoto,
} from "../services/api";
import "../assets/styles/AlbumDetail.css";

const AlbumPhotosPage = () => {
  const { albumId } = useParams();
  const [photos, setPhotos] = useState([]);
  const [newPhoto, setNewPhoto] = useState({
    title: "",
    url: "",
    thumbnailUrl: "",
  });

  useEffect(() => {
    getAlbumPhotos(albumId).then((response) => setPhotos(response.data));
  }, [albumId]);

  const handleAddPhoto = () => {
    addPhoto({ ...newPhoto, albumId }).then((response) =>
      setPhotos([...photos, response.data])
    );
  };

  const handleUpdatePhoto = (photoId) => {
    updatePhoto(photoId, newPhoto).then((response) => {
      setPhotos(
        photos.map((photo) => (photo.id === photoId ? response.data : photo))
      );
    });
  };

  const handleDeletePhoto = (photoId) => {
    deletePhoto(photoId).then(() => {
      setPhotos(photos.filter((photo) => photo.id !== photoId));
    });
  };

  return (
    <div className="photos-container">
      <h1>Photos</h1>
      <div className="photo-cards">
        {photos.map((photo) => (
          <div key={photo.id} className="photo-card">
            <img src={photo.thumbnailUrl} alt={photo.title} />
            <div className="photo-info">
              <h2>{photo.title}</h2>
              <div className="button-container">
                <Link to={`/photo/${photo.id}`} className="view-details-link">
                  View Details
                </Link>
                <button onClick={() => handleUpdatePhoto(photo.id)}>
                  Edit
                </button>
                <button onClick={() => handleDeletePhoto(photo.id)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div>
        <h2>Add New Photo</h2>
        <input
          type="text"
          placeholder="Title"
          onChange={(e) => setNewPhoto({ ...newPhoto, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="URL"
          onChange={(e) => setNewPhoto({ ...newPhoto, url: e.target.value })}
        />
        <input
          type="text"
          placeholder="Thumbnail URL"
          onChange={(e) =>
            setNewPhoto({ ...newPhoto, thumbnailUrl: e.target.value })
          }
        />
        <button onClick={handleAddPhoto}>Add Photo</button>
      </div>
    </div>
  );
};

export default AlbumPhotosPage;
