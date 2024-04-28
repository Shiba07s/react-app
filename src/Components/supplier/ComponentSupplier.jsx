import React, { useState } from 'react';
import './ComponentSupplier.css'
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Header from '../Header'
import Sidebar from '../Sidebar'

function ComponentSupplier() {
  
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

   const navigator = useNavigate();
  const [formData, setFormData] = useState({
        supplierName:'',
        supplierAddress: '',
        supplierContact: '',
        supplierEmail: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData,[e.target.name] : e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
           const response = await axios.post('http://localhost:7070/api/v1/suppliers/create', formData)
         // Check if the response data is an object and has a message property
         if (typeof response.data === 'object' && response.data.message) {
            // Display the message property without double quotes
            toast.success(response.data.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            sessionStorage.setItem('email', formData.email);

            navigator('/retype-password');

        } else {
            // If the response data is not an object or doesn't have a message property,
            // display the entire data as a string without double quotes
            toast.success(response.data, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            sessionStorage.setItem('email', formData.email);

            navigator('/retype-password')

        }
    } catch (error) {
        // Assuming the error response also contains a message property
        if (error.response && error.response.data && error.response.data.message) {
            // Display the error message without double quotes
            toast.error(error.response.data.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            // If the error response doesn't have a message property,
            // display the entire error response data as a string without double quotes
            toast.error(error.response?.data, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }
}

 

 return (
  <div className='grid-container'>
  <Header OpenSidebar={OpenSidebar}/>
  <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
    <div >
    <form onSubmit={handleSubmit}>
    <h2 className='text-center'>Add Supplier Form</h2>

      <div>
        <label htmlFor="supplierName">Supplier Name:</label>
        <input
          type="text"
          name='supplierName'
          id="supplierName"
          value={formData.supplierName}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="supplierAddress">Supplier Address:</label>
        <input
          type="text"
          name="supplierAddress"
          id="supplierAddress"
          value={formData.supplierAddress}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="supplierContact">Supplier Contact:</label>
        <input
          type="text"
          name="supplierContact"
          id="supplierContact"
          value={formData.supplierContact}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="supplierEmail">Supplier Email:</label>
        <input
          type="email"
          name="supplierEmail"
          id="supplierEmail"
          value={formData.supplierEmail}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
    </div>
    </div>
 );
}
 

export default ComponentSupplier;
