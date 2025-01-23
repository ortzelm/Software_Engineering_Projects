import { useNavigate } from 'react-router-dom';
import { UserContext } from '../userContext';
import { useContext } from 'react';
import { fetchServer } from '../service/server';
const Login = () => {
     const navigate = useNavigate();
     const { setCurrentUser } = useContext(UserContext);
     const tryToLogin = async (e) => {
          e.preventDefault(); // מניעת רענון הדף  
          const usersResponse = await fetchServer(`/users?username=${e.target.userName.value}&website=${e.target.password.value}`); // מביא נתונים מהשרת ולבינתים י עצירה להמשך התוכנית
          if (usersResponse[0]) {
               localStorage.setItem("currentUserId", JSON.stringify(usersResponse[0].id));
               setCurrentUser(usersResponse[0]); // שמירת פרטי המשתמש ב-Context
               navigate('/home/users/' + usersResponse[0].id);
          } else {
               alert('שם משתמש או סיסמה שגויים');
          }
     }
     const changeToSign = () => {
          navigate('/register');
     };
     return (
          <>
               <form onSubmit={tryToLogin}>
                    <label>user name</label>
                    <input id="userName" type="text" required></input>
                    <label>password</label>
                    <input id="password" type="password" required></input>
                    <button type="submit" >login</button>
                    <button type="button" onClick={changeToSign}>signin</button>
               </form>
          </>
     )
}
export default Login