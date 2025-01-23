import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchServer } from '../service/server';
import "./photos.css";
const limit = 10;
const Photos = () => {
  const navigate = useNavigate();
  const { albumId } = useParams(); // מזהה האלבום
  const [photos, setPhotos] = useState([]); // רשימת התמונות באלבום
  const [currentPage, setCurrentPage] = useState(0); // עמוד נוכחי
  const [isLoading, setIsLoading] = useState(false); // מצב טעינה
  const [finishPhotos, setFinishPhotos] = useState(false);

  useEffect(() => {
    if (!finishPhotos && (currentPage)*limit>=photos.length) {
      fetchPhotos();
    }
  }, [currentPage]); // קריאה מחדש בכל שינוי בעמוד

  const fetchPhotos = async () => {
    console.log("sdfghjk")
    setIsLoading(true);
    const data = await fetchServer(
      `/photos?albumId=${albumId}&_start=${currentPage * limit}&_limit=${limit}`
    );
    if (data?.length > 0) {
      setPhotos((prevPhotos) => [...prevPhotos, ...data]);
      if (data.length < limit) {
        setFinishPhotos(true); // אם קיבלנו פחות מ-limit, כנראה שאין יותר תמונות
      }
    }
    setIsLoading(false);
  };

  const handleAddOrUpdatePhoto = async (kind = 'add', photoObject = {}) => {
    const newTitle = prompt('Enter title:', kind === 'update' ? photoObject.title : '');
    const newthumbnailUrl = prompt('Enter thumbnailUrl:', kind === 'update' ? photoObject.thumbnailUrl : '');

    if (!newTitle || !newthumbnailUrl) return;
    const newPhoto = {
      albumId: albumId,
      title: newTitle,
      thumbnailUrl: newthumbnailUrl,
    };
    const newPhotoAfterServer = kind === 'update' ? await fetchServer(`/photos/${photoObject.id}`, newPhoto, 'PATCH') :
      await fetchServer('/photos', newPhoto, 'POST');
    if (newPhotoAfterServer) {
      kind !== 'update' ? setPhotos((prevP) => [...prevP, newPhotoAfterServer]) : setPhotos(photos.map((photo) =>
        photo.id === newPhotoAfterServer.id ? { ...photo, ...newPhotoAfterServer } : photo));
      alert('the photo save in succes');
    }
  };
  const handleDeletePhoto = async (photoId) => {
    const updatedPhotos = photos.filter((photo) => photo.id !== photoId);
    await fetchServer(`/photos/${photoId}`, {}, 'DELETE')
    setPhotos(updatedPhotos);
  };

  return (
    <div className="photos-container">
      <div className="album-header">
        <h1>Album {albumId}</h1>
        <button onClick={handleAddOrUpdatePhoto} className="add-photo-btn" > Add Photo</button>
        <button onClick={() => { navigate('..') }} style={{ float: 'right' }}>❌</button>
      </div>
      {(!isLoading) && <div className="photos-grid">
        {photos?.filter((x, i) => i >= currentPage * limit && i < (currentPage + 1) * limit).map((photo, index) => (
          <div key={photo.id} className="photo-card">
            <button onClick={() => { handleAddOrUpdatePhoto('update', photo) }}>✏️</button>
            <button onClick={() => handleDeletePhoto(photo.id)}>🗑️</button>
            <img src={photo.thumbnailUrl} />
            <p>{photo.title}</p>
          </div>
        ))}
      </div>}
      <div className="pagination">
        {(currentPage > 0) && <button
          className="pagination-btn prev-btn"
          onClick={() => setCurrentPage(currentPage - 1)}
        >Previous </button>}
        {((currentPage + 1) * limit < photos.length || !finishPhotos) && <button
          className="pagination-btn next-btn"
          onClick={() => {
            setCurrentPage(currentPage + 1);
          }
          }
        > Next</button>}
      </div>
    </div>
  );
};

export default Photos;