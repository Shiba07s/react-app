import axios from "axios";
import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import Header from '../Header'
import Sidebar from '../Sidebar'

const ListVehicle = () => {

  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }


  const navigate = useNavigate();

    const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    fetchVehicles();

  }, []);
  const fetchVehicles = async () => {
    try {
      const response = await axios.get('http://localhost:7070/api/v1/vehicles');
    setVehicles(response.data);
    } catch (error) {
      console.error('Error fetching vehicles:', error);

    }
    
  };

  const addNewVehicle = () => {
    navigate('/add-vehicles');
  };

  const updateVehicle = (id) => {
    navigate(`/edit-vehicles/${id}`);
  };



  return (
    <div className='grid-container'>
    <Header OpenSidebar={OpenSidebar}/>
    <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
    <div className='container'>
    <h2 className='text-center'>List Of Vehicles</h2>
    <button className='btn btn-primary mb-2' onClick={addNewVehicle}>
      Add Vehicles
    </button>
    <div  class="table-responsive-xl table-responsive-md table-responsive-lg table-responsive-sm table-responsive-xxl">
    <table className='table table-striped table-bordered'>
   
        <thead>
          <tr>
            <th>Vehicle ID</th>
            <th>Registration Number</th>
            <th>Vehicle Name</th>
            <th>Vehicle Number</th>
            <th>Driver Name</th>
            <th>Driver DL Number</th>
            <th>Driver Contact Number</th>
            <th>Model</th>
            <th>Color</th>
            <th>Action</th>

          </tr>
        </thead>
        <tbody>
          {vehicles.map(vehicle => (
            <tr key={vehicle.vehicleId}>
              <td>{vehicle.vehicleId}</td>
              <td>{vehicle.registrationNumber}</td>
              <td>{vehicle.vehicleName}</td>
              <td>{vehicle.vehicleNumber}</td>
              <td>{vehicle.driverName}</td>
              <td>{vehicle.driverDLNumber}</td>
              <td>{vehicle.driverContactNumber}</td>
              <td>{vehicle.model}</td>
              <td>{vehicle.color}</td>
              <td>
                <button
                  className='btn btn-info'
                  onClick={() => updateVehicle(vehicle.vehicleId)}
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
    </div>
  );
};

export default ListVehicle;
