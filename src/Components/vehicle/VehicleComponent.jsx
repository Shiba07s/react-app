import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../Header'
import Sidebar from '../Sidebar'

const VehicleComponent = () => {

  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }


 const { id } = useParams(); // Get the vehicle ID from the URL
 const navigate = useNavigate();
 const [vehicleData, setVehicleData] = useState({
    registrationNumber: '',
    vehicleName: '',
    vehicleNumber: '',
    driverName: '',
    driverDLNumber: '',
    driverContactNumber: '',
    model: '',
    color: '',
 });

 useEffect(() => {
    if (id) { // If there's an ID, fetch the vehicle data
      axios.get(`http://localhost:7070/api/v1/vehicles/${id}`)
        .then(response => {
          setVehicleData(response.data);
        })
        .catch(error => console.error('Error fetching vehicle:', error));
    }
 }, [id]);

 const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicleData(prevState => ({ ...prevState, [name]: value }));
 };

 const saveVehicle = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (id) { // If there's an ID, update the vehicle
        response = await axios.put(`http://localhost:7070/api/v1/vehicles/${id}`, vehicleData);
      } else { // Otherwise, create a new vehicle
        response = await axios.post('http://localhost:7070/api/v1/vehicles/create', vehicleData);
      }
      console.log('Success:', response.data);
      navigate('/get-vehicles'); // Redirect to vehicles list or another page
    } catch (error) {
      console.error('Error:', error);
    }
 };

 return (
  <div className='grid-container'>
  <Header OpenSidebar={OpenSidebar}/>
  <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
    <div className='container'>
    <br /> <br />
    <div className='row'>
    {/* <div className='card col-md-6 offset-md-3 offset-md-3'> */}
         <div className='card-body'>
           <form onSubmit={saveVehicle}>
           <h2 className='text-center'>{id ? 'Update' : 'Add'} Vehicle</h2>

             {/* Registration Number */}
             <div className='form-group mb-2'>
               <label className='form-label'>Registration Number</label>
               <input
                 type='text'
                 placeholder='Enter Registration Number'
                 name='registrationNumber'
                 value={vehicleData.registrationNumber}
                 className='form-control'
                 onChange={handleChange}
               />
             </div>
             {/* Vehicle Name */}
             <div className='form-group mb-2'>
               <label className='form-label'>Vehicle Name</label>
               <input
                 type='text'
                 placeholder='Enter Vehicle Name'
                 name='vehicleName'
                 value={vehicleData.vehicleName}
                 className='form-control'
                 onChange={handleChange}
               />
             </div>
             {/* Vehicle Number */}
             <div className='form-group mb-2'>
               <label className='form-label'>Vehicle Number</label>
               <input
                 type='text'
                 placeholder='Enter Vehicle Number'
                 name='vehicleNumber'
                 value={vehicleData.vehicleNumber}
                 className='form-control'
                 onChange={handleChange}
               />
             </div>
             {/* Driver Name */}
             <div className='form-group mb-2'>
               <label className='form-label'>Driver Name</label>
               <input
                 type='text'
                 placeholder='Enter Driver Name'
                 name='driverName'
                 value={vehicleData.driverName}
                 className='form-control'
                 onChange={handleChange}
               />
             </div>
             {/* Driver DL Number */}
             <div className='form-group mb-2'>
               <label className='form-label'>Driver DL Number</label>
               <input
                 type='text'
                 placeholder='Enter Driver DL Number'
                 name='driverDLNumber'
                 value={vehicleData.driverDLNumber}
                 className='form-control'
                 onChange={handleChange}
               />
             </div>
             {/* Driver Contact Number */}
             <div className='form-group mb-2'>
               <label className='form-label'>Driver Contact Number</label>
               <input
                 type='text'
                 placeholder='Enter Driver Contact Number'
                 name='driverContactNumber'
                 value={vehicleData.driverContactNumber}
                 className='form-control'
                 onChange={handleChange}
               />
             </div>
             {/* Model */}
             <div className='form-group mb-2'>
               <label className='form-label'>Model</label>
               <input
                 type='text'
                 placeholder='Enter Model'
                 name='model'
                 value={vehicleData.model}
                 className='form-control'
                 onChange={handleChange}
               />
             </div>
             {/* Color */}
             <div className='form-group mb-2'>
               <label className='form-label'>Color</label>
               <input
                 type='text'
                 placeholder='Enter Color'
                 name='color'
                 value={vehicleData.color}
                 className='form-control'
                 onChange={handleChange}
               />
             </div>
             <button type='submit' className='btn btn-success'>
               {id ? 'Update' : 'Submit'}
             </button>
           </form>
         </div>
       {/* </div> */}
    </div>
   </div>
   </div>
   
 );
};

export default VehicleComponent;
