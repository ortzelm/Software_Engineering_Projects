import { useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from '../userContext';
import { useContext } from 'react';
import { fetchServer } from '../service/server';

const RegisterFinally = () => {
     const navigate = useNavigate();
     const { setCurrentUser } = useContext(UserContext);
     const location = useLocation();
     const { tempName, tempPassword } = location.state || {}; // קריאה לנתונים שהועברו
   
     const tryToSignFinally = async (e) => {
          e.preventDefault(); // מניעת רענון הדף  
          const formData = new FormData(e.target);
          let userObject = {};
          for (const [key, value] of formData.entries()) {
               console.log(key);
               const keys = key.split('.'); // Split keys for nested structure
               let current = userObject;
               keys.forEach((k, index) => {
                    if (index === keys.length - 1) {
                         current[k] = value; // Assign value to the final key
                    } else {
                         current[k] = current[k] || {}; // Create nested object if it doesn't exist
                         current = current[k];
                    }
               });
          };
          userObject.username = tempName; // הוספת שדה username
          userObject.website = tempPassword; // הוספת שדה website
          const usersResponse = await fetchServer(`/users`, userObject, 'POST');
          if (usersResponse) {
               localStorage.setItem("currentUserId", JSON.stringify(usersResponse.id));
               setCurrentUser(usersResponse); // שמירת פרטי המשתמש ב-Context
               alert("sign in succed")
               navigate('/home/users/' + usersResponse.id);
          }
     }

     const changeToLogin = () => {
          navigate('/');
     };
     return (
          <>
               <form onSubmit={tryToSignFinally}>
                    {/* מידע אישי */}
                    <div>
                         <label htmlFor="name">Name:</label>
                         <input name="name" type="text" />
                    </div>
                    <div>
                         <label htmlFor="email">Email:</label>
                         <input name="email" type="email" />
                    </div>
                    <div>
                         <label htmlFor="phone">Phone:</label>
                         <input name="phone" type="tel" />
                    </div>
                    {/* כתובת */}
                    <fieldset >
                         <legend>Address</legend>
                         <div>
                              <label htmlFor="street">Street:</label>
                              <input name="address.street" type="text" />
                         </div>
                         <div>
                              <label htmlFor="suite">Suite:</label>
                              <input name="address.suite" type="text" />
                         </div>
                         <div>
                              <label htmlFor="city">City:</label>
                              <input name="address.city" type="text" />
                         </div>
                         <div>
                              <label htmlFor="zipcode">Zipcode:</label>
                              <input name="address.zipcode" type="text" />
                         </div>
                         <fieldset >
                              <legend>Geo</legend>
                              <div>
                                   <label htmlFor="latitude">Latitude:</label>
                                   <input name="address.geo.lat" type="text" />
                              </div>
                              <div>
                                   <label htmlFor="longitude">Longitude:</label>
                                   <input name="address.geo.lng" type="text" />
                              </div>
                         </fieldset>
                    </fieldset>
                    {/* פרטי החברה */}
                    <fieldset>
                         <legend>Company</legend>
                         <div>
                              <label htmlFor="companyName">Company Name:</label>
                              <input name="company.name" type="text" />
                         </div>
                         <div>
                              <label htmlFor="catchPhrase">Catch Phrase:</label>
                              <input name="company.catchPhrase" type="text" />
                         </div>
                         <div>
                              <label htmlFor="bs">BS:</label>
                              <input name="company.bs" type="text" />
                         </div>
                    </fieldset>
                    <button type="submit">Sign In</button>
                    <button type="button" onClick={changeToLogin}>login</button>
               </form>
          </>
     )
}
export default RegisterFinally
