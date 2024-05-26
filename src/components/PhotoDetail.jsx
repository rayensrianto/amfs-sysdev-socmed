import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPhotoDetails } from "../services/api";
import "../assets/styles/PhotoDetail.css";
const PhotoDetailPage = () => {
  const { photoId } = useParams();
  const [photo, setPhoto] = useState({});

  useEffect(() => {
    getPhotoDetails(photoId).then((response) => setPhoto(response.data));
  }, [photoId]);

  return (
    <div className="photo-detail-container">
      <div className="photo-detail">
        <h1>{photo.title}</h1>
        <img src={photo.url} alt={photo.title} />
        <p>{photo.title}</p>
      </div>
    </div>
  );
};

export default PhotoDetailPage;
