import React, { useState, useEffect } from 'react'; // Added useEffect
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams } from 'react-router-dom'; // Added useParams
import Header from '../Header'
import Sidebar from '../Sidebar'

const TransporterComponent = () => {

  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

 const { id } = useParams(); // Get the transporter ID from the URL
 const navigate = useNavigate();
 const [transporterName, setTransporterName] = useState('');
 const [contactNumber, setContactNumber] = useState('');
 const [email, setEmail] = useState('');
 const [address, setAddress] = useState('');
 const [registrationNumber, setRegistrationNumber] = useState('');
 const [membershipId, setMembershipId] = useState('');

 useEffect(() => {
  console.log('ID from URL:', id); // Debugging line

    if (id) { // If there's an ID, fetch the transporter data
      axios.get(`http://localhost:7070/api/v1/transporters/${id}`)
        .then(response => {
          const { transporterName, contactNumber, email, address, registrationNumber, membershipId } = response.data;
          setTransporterName(transporterName);
          setContactNumber(contactNumber);
          setEmail(email);
          setAddress(address);
          setRegistrationNumber(registrationNumber);
          setMembershipId(membershipId);
        })
        .catch(error => console.error('Error fetching transporter:', error));
    }
 }, [id]);

 const saveTransporter = async (e) => {
  e.preventDefault();
  const transporterData = {
    transporterName,
    contactNumber,
    email,
    address,
    registrationNumber,
    membershipId,
  };

  try {
    let response;
    if (id) { // If there's an ID, update the transporter
      response = await axios.put(`http://localhost:7070/api/v1/transporters/ashu/${id}`, transporterData);
    } else { // Otherwise, create a new transporter
      response = await axios.post('http://localhost:7070/api/v1/transporters/create', transporterData);
    }
    console.log('Success:', response.data);
    navigate('/get-transporters'); // Redirect to transporters list or another page
  } catch (error) {
    console.error('Error:', error);
  }
};

     

  return (
    <div className='grid-container'>
    <Header OpenSidebar={OpenSidebar}/>
    <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
    <div className='container text-center'>
      <br /> <br />
      {/* <div className='row'> */}
        {/* <div className='card col-md-6 offset-md-3 offset-md-3'> */}
          {/* <div className='card-body'> */}
          <form onSubmit={saveTransporter}>
          <h2 className='text-center'>{id ? 'Update' : 'Add'} Transporter</h2>

              <div className='form-group mb-2'>
                <label className='form-label'>Transporter Name</label>
                <input
                  type='text'
                  placeholder='Enter Transporter Name'
                  name='transporterName'
                  value={transporterName}
                  className='form-control'
                  onChange={(e) => setTransporterName(e.target.value)}
                />
              </div>
              <div className='form-group mb-2'>
                <label className='form-label'>Contact Number</label>
                <input
                  type='text'
                  placeholder='Enter Contact Number'
                  name='contactNumber'
                  value={contactNumber}
                  className='form-control'
                  onChange={(e) => setContactNumber(e.target.value)}
                />
              </div>
              <div className='form-group mb-2'>
                <label className='form-label'>Email</label>
                <input
                  type='text'
                  placeholder='Enter Email'
                  name='email'
                  value={email}
                  className='form-control'
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className='form-group mb-2'>
                <label className='form-label'>Address</label>
                <input
                  type='text'
                  placeholder='Enter Address'
                  name='address'
                  value={address}
                  className='form-control'
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className='form-group mb-2'>
                <label className='form-label'>Registration Number</label>
                <input
                  type='text'
                  placeholder='Enter Registration Number'
                  name='registrationNumber'
                  value={registrationNumber}
                  className='form-control'
                  onChange={(e) => setRegistrationNumber(e.target.value)}
                />
              </div>
              <div className='form-group mb-2'>
                <label className='form-label'>Membership ID</label>
                <input
                  type='text'
                  placeholder='Enter Membership ID'
                  name='membershipId'
                  value={membershipId}
                  className='form-control'
                  onChange={(e) => setMembershipId(e.target.value)}
                />
              </div>
              <button type='submit' className='btn btn-success'>
                {id ? 'Update' : 'Submit'}
              </button>
            </form>
          {/* </div> */}
        {/* </div> */}
      {/* </div> */}
    </div>
    </div>
  );
};

export default TransporterComponent;