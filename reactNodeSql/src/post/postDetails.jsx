import { useParams, useNavigate, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchServer } from '../service/server';

//import {selectedPost} from './posts'
const PostDetails = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [showComment, setShowComment] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      const data = await fetchServer(`/posts/${postId}`);
      setPost(data);
    };
    fetchPost();
    setShowComment(false);
  }, [postId]);

  if (!post) {
    return <div>Loading...</div>;
  }
  const showHideComments = () => {
    showComment ? navigate('.') : navigate('comments', { state: { postId: postId } });
    setShowComment(!showComment);
  }
  return (
    <div style={{ padding: '20px', border: '1px solid gray', background: '#f9f9f9' }}>
      <button onClick={() => { navigate('..') }} style={{ float: 'right' }}>❌</button>
    {post&&<div><h2>{post.title}</h2>
      <p>{post.body}</p>
      <button onClick={showHideComments}>{showComment ? 'hide comments' : 'show comments'}</button></div>}
      <Outlet />
    </div>
  );
};

export default PostDetails;
