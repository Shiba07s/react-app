import React, { useEffect, useState } from 'react';
import { listSuppliers } from '../../services/SupplierService';
import { useNavigate } from 'react-router-dom';
import './ComponentSupplier.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../Header'
import Sidebar from '../Sidebar'

const ListSupplier = () => {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

    const OpenSidebar = () => {
      setOpenSidebarToggle(!openSidebarToggle)
    }

  const [suppliers, setSuppliers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    listSuppliers()
      .then((response) => {
        setSuppliers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const addNewSupplier = () => {
    navigate('/add-supplier');
  };

  const updateSupplier = (supplierId) => {
    navigate(`/edit-supplier/${supplierId}`);
  };

  return (
    <div className='grid-container'>
    <Header OpenSidebar={OpenSidebar}/>
    <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
    <div className='container'>
      <h2 className='text-center'>List Of Suppliers</h2>
      <button className='btn btn-primary mb-2' onClick={addNewSupplier}>
        Add Supplier
      </button>
      <div  class="table-responsive-xl table-responsive-md table-responsive-lg table-responsive-sm table-responsive-xxl">
      <table className='table table-striped table-bordered'>
        <thead>
          <tr>
            <th>Supplier Id</th>
            <th>Supplier Name</th>
            <th>Supplier Address</th>
            <th>Supplier Contact</th>
            <th>Supplier Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((supplier) => (
            <tr key={supplier.supplierId}>
              <td>{supplier.supplierId}</td>
              <td>{supplier.supplierName}</td>
              <td>{supplier.supplierAddress}</td>
              <td>{supplier.supplierContact}</td>
              <td>{supplier.supplierEmail}</td>
              <td>
                <button
                  className='btn btn-info'
                  onClick={() => updateSupplier(supplier.supplierId)}
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

export default ListSupplier;