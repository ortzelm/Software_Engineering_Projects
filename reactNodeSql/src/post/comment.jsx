import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { fetchServer } from '../service/server';
import { UserContext } from '../userContext';

const Comments = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const [showMyComment, setshowMyComment] = useState(true);
  const [postId, setPostId] = useState(location.state?.postId);
  const [allComments, setallComments] = useState([]);
  const [myComments, setmyComments] = useState([]);
  const [editingComment, setEditingComment] = useState(null); 
  const [tempComment, setTempComment] = useState({ name: "", body: "" }); // ערכים זמניים לעריכה

  useEffect(() => {
    const fetchComment = async () => {
      let allComments = await fetchServer(`/comments?postId=${postId}`); 
      setallComments(allComments);
      allComments = allComments.filter(comment => comment.email === currentUser.email);
      setmyComments(allComments);
    };
    fetchComment();
    setshowMyComment(true);
  }, []);

  const handleSaveComment = async (commentId) => {
      const updatedComment = { name: tempComment.name, body: tempComment.body };
      await fetchServer(`/comments/${commentId}`, updatedComment, 'PATCH'); // עדכון בשרת
      setallComments((prevComments) =>prevComments.map((comment) => comment.id === commentId ? { ...comment, ...updatedComment } : comment)  );
        setmyComments((prevComments) => prevComments.map((comment) => comment.id === commentId ? { ...comment, ...updatedComment } : comment ));
      setEditingComment(null);  };

  const handleDeleteComment = async (commentId) => {
      await fetchServer(`/comments/${commentId}`, null, 'DELETE'); // מחיקת התגובה בשרת
      setallComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId)
      );
      setmyComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId)
      );
  };
  const handleAddComment = async () => {
    const newName = prompt('Enter comment name:');
    const newBody = prompt('Enter comment body:');
    if(!newName || !newBody) return;
    const newComment = { postId: postId, email: currentUser.email, name: newName, body: newBody };
      const newCommentAfterServer = await fetchServer('/comments', newComment, 'POST');
      setallComments((prevComments) => [...prevComments, newCommentAfterServer]);
      setmyComments((prevComments) => [...prevComments, newCommentAfterServer]);
  };

  return (
    <><div>
       <button onClick={()=>{setshowMyComment(!showMyComment)}}>{showMyComment!==true?'my comment':'all comment'}</button>
       <button onClick={handleAddComment}>add comment</button>
        {(showMyComment ? myComments?.length > 0 ? myComments: [] : allComments?.length > 0 ? allComments: []).map((comment) => (
          <div
            key={comment.id}
            style={{
              position: 'relative',
              padding: '10px',
              border: '1px solid #ccc',
              marginBottom: '10px',
            }}
          ><hr />
            {currentUser.email === comment.email && (
              <> <button
                  onClick={() => {
                    setEditingComment(comment.id);
                    setTempComment({ name: comment.name, body: comment.body });
                  }}
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '40px',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '18px',
                  }}
                >
                  ✏️
                </button>
                <button
                  onClick={() => handleDeleteComment(comment.id)}
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '18px',
                    color: 'red',
                  }}
                >
                  ❌
                </button>
              </>
            )}
            <h5>{comment.email}</h5>
            <div>
              {editingComment === comment.id ? (
                <input
                  type="text"
                  value={tempComment.name}
                  onChange={(e) => setTempComment({ ...tempComment, name: e.target.value })}
                  autoFocus
                  style={{ marginBottom: '5px', width: '100%' }}
                />
              ) : (
                <h3>{comment.name}</h3>
              )}
            </div>
            <div>
              {editingComment === comment.id ? (
                <textarea
                  value={tempComment.body}
                  onChange={(e) => setTempComment({ ...tempComment, body: e.target.value })}
                  rows="3"
                  style={{ width: '100%' }}
                />
              ) : (
                <p>{comment.body}</p>
              )}
            </div>
            {editingComment === comment.id && (
              <div style={{ marginTop: '10px' }}>
                <button
                  onClick={() => handleSaveComment(comment.id)}
                  style={{ marginRight: '5px' }}
                >
                  ✔ Save
                </button>
                <button onClick={() => setEditingComment(null)}>✖ Cancel</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default Comments;