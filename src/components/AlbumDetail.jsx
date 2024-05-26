import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getAlbumPhotos } from "../services/api";
import "../assets/styles/AlbumDetail.css";
import ReactPaginate from "react-paginate";

const AlbumPhotosPage = () => {
  const { albumId } = useParams();
  const [photos, setPhotos] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const photosPerPage = 6; // Change this value according to your preference

  useEffect(() => {
    getAlbumPhotos(albumId).then((response) => setPhotos(response.data));
  }, [albumId]);

  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
  };

  const pageCount = Math.ceil(photos.length / photosPerPage);
  const offset = pageNumber * photosPerPage;
  const displayedPhotos = photos.slice(offset, offset + photosPerPage);

  return (
    <div className="photos-container">
      <h1>Photos</h1>
      <div className="photo-cards">
        {displayedPhotos.map((photo) => (
          <div key={photo.id} className="photo-card">
            <div className="photo-card-content">
              <img src={photo.thumbnailUrl} alt={photo.title} />
              <div className="photo-info">
                <h2>{photo.title}</h2>
                <div className="button-container">
                  <Link to={`/photo/${photo.id}`} className="view-details-link">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <br></br>
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={handlePageChange}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </div>
  );
};

export default AlbumPhotosPage;
