import { useNavigate } from 'react-router-dom';
import { fetchServer } from '../service/server';

const Register = () => {
     const navigate = useNavigate();
     const tryToSign = async (e) => {
          e.preventDefault(); // מניעת רענון הדף 
          const tempName = e.target.userName.value;
          const tempPassword = e.target.password.value;
          if (tempPassword != e.target.verifyPassword.value) {
               alert("the password is not the same");
               return;
          }
          const usersResponse = await fetchServer(`/users?username=${tempName}`); // מביא נתונים מהשרת ולבינתים י עצירה להמשך התוכנית
          console.log(usersResponse);
          if (usersResponse) {
               if (usersResponse.length >0) {
                    alert("the username is already exist");
                    return;
               }
               else {
                    alert("continue to fill all details");
                    navigate('/registerFinally', { state: { tempName, tempPassword } })
               }
          }
     }
     const changeToLogin = () => {
          navigate('/');
     };
     return (
          <>
               <form onSubmit={tryToSign}>
                    <label>user name</label>
                    <input id="userName" type="text"></input>
                    <label>password</label>
                    <input id="password" type="password"></input>
                    <label>verify-password</label>
                    <input id="verifyPassword" type="password"></input>
                    <button type="submit">signin</button>
                    <button type="button" onClick={changeToLogin}>login</button>
               </form>
          </>
     )
}
export default Register
