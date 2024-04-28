import axios from "axios";
import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import Header from '../Header'
import Sidebar from '../Sidebar'

const ListTransporter = () => {

  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }
    const navigate = useNavigate();

    const [transporters, setTranspoters] = useState([]);

  useEffect(() => {
    fetchTransporters();

  }, []);
  const fetchTransporters = async () => {
    try {
      const response = await axios.get('http://localhost:7070/api/v1/transporters');
    setTranspoters(response.data);
    } catch (error) {
      console.error('Error fetching transporters:', error);

    }
    
  };

  const addNewTranspoters = () => {
    navigate(`/add-transporters`);
  };

  const updateTranspoters = (id) => {
    navigate(`/edit-transporters/${id}`);
   };
   

  return (
    <div className='grid-container'>
    <Header OpenSidebar={OpenSidebar}/>
    <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
    <div className='container'>
    <h2 className='text-center'>List Of Transporters</h2>
    <button className='btn btn-primary mb-2' onClick={addNewTranspoters}>
      Add Transporters
    </button>
    <div  class="table-responsive-xl table-responsive-md table-responsive-lg table-responsive-sm table-responsive-xxl">
    <table className='table table-striped table-bordered'>
   
        <thead>
          <tr>
          <th>ID</th>
            <th>Transporter Name</th>
            <th>Contact Number</th>
            <th>Email</th>
            <th>Address</th>
            <th>Registration Number</th>
            <th>Membership ID</th>
            <th>Action</th>

          </tr>
        </thead>
        <tbody>
        {transporters.map(transporter => (
            <tr key={transporter.id}>
              <td>{transporter.id}</td>
              <td>{transporter.transporterName}</td>
              <td>{transporter.contactNumber}</td>
              <td>{transporter.email}</td>
              <td>{transporter.address}</td>
              <td>{transporter.registrationNumber}</td>
              <td>{transporter.membershipId}</td>
              <td>
                <button
                  className='btn btn-info'
                  onClick={() => updateTranspoters(transporter.id)}
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

export default ListTransporter