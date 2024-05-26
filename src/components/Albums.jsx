import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getUserAlbums } from "../services/api";
import "../assets/styles/AlbumsPage.css";

const AlbumsPage = () => {
  const { userId } = useParams();
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    getUserAlbums(userId).then((response) => setAlbums(response.data));
  }, [userId]);

  return (
    <div className="albums-container">
      <h1>Albums</h1>
      <div className="album-cards">
        {albums.map((album) => (
          <div key={album.id} className="album-card">
            <h2>{album.title}</h2>
            <Link to={`/photos/${album.id}`} className="view-photos-link">
              View Photos
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlbumsPage;
