import { useNavigate, useParams, Outlet, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchServer } from '../service/server';
import '../allCss.css';

const Albums = () => {
  const { albumId } = useParams() || 0;
  const navigate = useNavigate();
  const [albums, setAlbums] = useState([]);
  const [filteredAlbums, setFilteredAlbums] = useState([]);
  const [search, setSearch] = useState({ id: '', title: '' });
  const currentUserId = JSON.parse(localStorage.getItem('currentUserId'));
  useEffect(() => {
    const fetchPost = async () => {
      let allAlbums = await fetchServer(`/albums?userId=${currentUserId}`);
      setAlbums(allAlbums);
    };
    fetchPost();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [search, albums]);
  const handleSearch = () => {
    let filtered = [...albums];
    if (search.id !== '') {
      filtered = filtered.filter(album => album.id.toString().includes(search.id));
    }
    if (search.title !== '') {
      filtered = filtered.filter(album => album.title.toLowerCase().includes(search.title.toLowerCase()));
    }
    setFilteredAlbums(filtered);
  };
  const handleAddAlbum = async () => {
    const newTitle = prompt('Enter title:');
    if (!newTitle) return;
    const newAlbum = { userId: currentUserId, title: newTitle };
    const newAlbumAfterServer = await fetchServer('/albums', newAlbum, 'POST');
    setAlbums((prevAlbums) => [...prevAlbums, newAlbumAfterServer]);
  };
  return (
    <div >
      <h1 >Albums</h1>
      <button onClick={handleAddAlbum}>Add Album</button>
      <div style={{ display: 'flex', gap: '20px', margin: '20px 0' }}>
        <div className='searchAlbum'>search by id<input type="text" placeholder="Search ID" value={search.id} onChange={(e) => setSearch({ ...search, id: e.target.value })} /></div>
        <div className='searchAlbum'>search by title<input type="text" placeholder="Search Title" value={search.title} onChange={(e) => setSearch({ ...search, title: e.target.value })} /></div>
      </div>
      {filteredAlbums?.map((album) => (
        <div key={album.id} className='albumdet'>
          <p className='albumNo'>album no: {album.id}</p>
          <Link to={`${album.id}/photos`} className="linksOfAlbums" >{album.title}</Link>
          {albumId === album.id && <Outlet />}
        </div>
      ))}
    </div>
  );
};
export default Albums;