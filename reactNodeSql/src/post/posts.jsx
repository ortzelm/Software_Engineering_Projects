import { useNavigate, Outlet, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchServer } from '../service/server';
import '../allCss.css';

const Posts = () => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const [posts, setPosts] = useState([]);
  const [postsSpecific, setPostsSpecific] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [currentShow, setCurrentShow] = useState(JSON.parse(localStorage.getItem('currentUserId')));
  const [search, setSearch] = useState({ id: '', title: '' });
  const currentUserId = JSON.parse(localStorage.getItem('currentUserId'));
  
  useEffect(() => {
    const fetchPost = async () => {
      let allPosts = await fetchServer(`/posts`);
      setPosts(allPosts);
      allPosts = allPosts.filter(post => post.userId.toString() === currentShow.toString());
      setPostsSpecific(allPosts);
    };
    fetchPost();
  }, []);

  useEffect(() => {
    if(posts?.length>0)
      {
    handleSearch();
  }
  }, [search, posts, currentShow]);
  const handleSearch = () => {
    let filtered = currentShow === 'all' ? [...posts] : [...postsSpecific];
    if (search.id !== '') {
      filtered = filtered.filter(post => post.id.toString().includes(search.id));
    }
    if (search.title !== '') {
      filtered = filtered.filter(post => post.title.toLowerCase().includes(search.title.toLowerCase()));
    }
    setFilteredPosts(filtered);
  };
  const handleDelete = async (postId) => {
      await fetchServer(`/posts/${postId}`, {}, 'DELETE');
      setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
      setPostsSpecific(prevPosts => prevPosts.filter(post => post.id !== postId));
  };
  const handleShowMineOrAll = () => {
    if (currentShow === 'all') {
      setCurrentShow(JSON.parse(localStorage.getItem('currentShow')));
    } else {
      setCurrentShow('all');
    }
  };
  const showDetail = (pid) => {
    navigate(`${pid}/details`)
  }
  return (
    <div style={{ display: 'flex', position: 'relative' }}>
      <div style={{ flex: 1 }}>
        <h1>Posts</h1>
        <button onClick={() => navigate('add', { state: { post: {} } })}>Add Post</button>
        <button onClick={handleShowMineOrAll}>{currentShow !== 'all' ? 'all posts' : 'my posts'}</button>
        <table className="posts-table">
          <thead>
            <tr>
              <th>ID<br /><input type="text" placeholder="Search ID" value={search.id} onChange={(e) => setSearch({ ...search, id: e.target.value })} /></th>
              <th>Title<br /><input type="text" placeholder="Search Title" value={search.title} onChange={(e) => setSearch({ ...search, title: e.target.value })} /></th>
              <th>Show</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredPosts?.map((post) => (
              <tr key={post.id}>
                <td>{post.id}</td>
                <td className={postId === post.id ? 'highlight' : ''}>{post.title}</td>
                <td>
                  <button onClick={() => showDetail(post.id)}>Show</button>
                </td>
                <td>
                  {post.userId.toString() === currentUserId.toString() && <button
                    onClick={() => navigate(post.id + '/update', { state: { post: post } })}
                    style={{ marginLeft: '10px' }}
                  > ✏️ </button>}
                </td>
                <td>
                  {post.userId.toString() === currentUserId.toString() && <button onClick={() => handleDelete(post.id)}>🗑️</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Outlet />
    </div>
  );
};
export default Posts;