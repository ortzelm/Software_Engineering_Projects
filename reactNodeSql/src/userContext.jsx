import { useState, createContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchServer } from './service/server';
import './App.css';

export const UserContext = createContext();

function UserProvider({ children }) {
     const [currentUser, setCurrentUser] = useState(null);
     const navigate = useNavigate();
     useEffect(() => {
          if (!currentUser) {
               const userId = JSON.parse(localStorage.getItem('currentUserId'));
               if (userId) {
                    const tryToLogin = async (e) => {
                         const usersResponse = await fetchServer(`/users?id=${userId}`); 
                         setCurrentUser(usersResponse[0]);                       
                    }
                    tryToLogin();
               }
               else
                  navigate('/login'); 
          }
     }, [currentUser]);
     return (
          <>
               <UserContext.Provider value={{ currentUser, setCurrentUser }}>
                    {children}
               </UserContext.Provider>
          </>
     );
}
export default UserProvider;


