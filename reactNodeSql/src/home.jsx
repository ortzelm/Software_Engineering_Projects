import { Outlet, replace, useNavigate } from 'react-router-dom';
import { UserContext } from './userContext';
import { useContext } from 'react';

const Home = () => {
     const { currentUser, setCurrentUser } = useContext(UserContext);
     const navigate = useNavigate();
     const logout = () => {
          localStorage.clear();
          setCurrentUser(null);
          alert("byyyyy");
          navigate('/login' ,{replace:true});

     }

     return (
          <div>
               <h1>{currentUser?.name}</h1>
               <button onClick={() => navigate('info')}>info</button>
               <button onClick={() => navigate('todos')}>todos</button>
               <button onClick={() => navigate('posts')}>posts</button>
               <button onClick={() => navigate('albums')}>albums</button>
               <button onClick={logout}>Logout</button>
               <Outlet />
          </div >
     );
}

export default Home;