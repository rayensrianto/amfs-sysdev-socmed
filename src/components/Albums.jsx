import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getUserAlbums } from "../services/api";
import "../assets/styles/AlbumsPage.css";

const AlbumsPage = () => {
  const { userId } = useParams();
  const [albums, setAlbums] = useState([]);
  const [currentPage] = useState(1);
  const albumsPerPage = 6; // Ubah sesuai kebutuhan

  useEffect(() => {
    getUserAlbums(userId).then((response) => setAlbums(response.data));
  }, [userId]);

  // Hitung indeks album untuk pagination
  const indexOfLastAlbum = currentPage * albumsPerPage;
  const indexOfFirstAlbum = indexOfLastAlbum - albumsPerPage;
  const currentAlbums = albums.slice(indexOfFirstAlbum, indexOfLastAlbum);

  // Fungsi untuk mengubah halaman

  return (
    <div className="albums-container">
      <h1>Albums</h1>
      <div className="album-cards">
        {currentAlbums.map((album) => (
          <div key={album.id} className="album-card with-shadow">
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
