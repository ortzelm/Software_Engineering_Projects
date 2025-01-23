import { UserContext } from '../userContext';
import { useContext } from 'react';
const InformUser = () => {
  const { currentUser } = useContext(UserContext);
  return (
    <>
       <div style={{ fontFamily: 'Arial, sans-serif', lineHeight: '1.6', maxWidth: '600px', margin: '0 auto' }}>
      <h2>User Details</h2>
      <div>
        <h3>Personal Information</h3>
        <p>Name: {currentUser.name}</p>
        <p>Username: {currentUser.username}</p>
        <p>Email: {currentUser.email}</p>
        <p>Phone: {currentUser.phone}</p>
      </div>

      <div>
        <h3>Address</h3>
        <p>Street: {currentUser.address.street}</p>
        <p>Suite: {currentUser.address.suite}</p>
        <p>City: {currentUser.address.city}</p>
        <p>Zipcode: {currentUser.address.zipcode}</p>
        <h4>Geo Location</h4>
        <p>Latitude: {currentUser.address.geo.lat}</p>
        <p>Longitude: {currentUser.address.geo.lng}</p>
      </div>

      <div>
        <h3>Company Information</h3>
        <p>Company Name: {currentUser.company.name}</p>
        <p>Catch Phrase: {currentUser.company.catchPhrase}</p>
        <p>BS: {currentUser.company.bs}</p>
      </div>
    </div>
    </>
  )
}
export default InformUser;