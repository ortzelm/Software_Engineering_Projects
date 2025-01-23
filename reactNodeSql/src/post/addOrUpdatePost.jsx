
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchServer } from '../service/server';

const AddOrUpdatePost = () => {
  const navigate = useNavigate();
  const [post, setPost] = useState({});
  const location = useLocation();

  useEffect(() => {
    setPost(location.state?.post || {});
  }, []);
  useEffect(() => {
    if (location.state?.post) {
      setPost(location.state.post);
    }
  }, [location.state]);
  
  const submitForm = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    let postObject = {};
    for (const [key, value] of formData.entries()) {
      const keys = key.split('.'); // Split keys for nested structure
      let current = postObject;
      keys.forEach((k, index) => {
        if (index === keys.length - 1) {
          current[k] = value; // Assign value to the final key
        } else {
          current[k] = current[k] || {}; // Create nested object if it doesn't exist
          current = current[k];
        }
      });
    };
    try{
      post.id ? await fetchServer(`/posts/${post.id}`, postObject, 'PATCH') :
                await fetchServer(`/posts`, { ...postObject, userId: JSON.parse(localStorage.getItem('currentUserId')) }, 'POST');
                alert('the post is save succes');
    }catch(error){};
      navigate(`/home/users/${JSON.parse(localStorage.getItem('currentUserId'))}/posts`);
  }
  return (
    <>
      <form onSubmit={submitForm}>
        <p>{post.id ? "update post" : "add post"}</p>
        <input type="text" name="title" defaultValue={post.title ? post.title : ""}></input>
        <textarea type="text" name="body" defaultValue={post.body ? post.body : ""}></textarea>
        <button type='submit'>submit</button>
      </form>
      <button onClick={()=>navigate(-1)}>Cancel</button>
    </>
  )
};
export default AddOrUpdatePost;