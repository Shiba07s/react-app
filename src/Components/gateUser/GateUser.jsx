import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify'; // Import toast from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS
import Header from '../Header'
import Sidebar from '../Sidebar'

const GateUser = () => {

  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }


  const [formData, setFormData] = useState({
    vehicleId: '',
    registrationNumber: '',
    vehicleName: '',
    vehicleNumber: '',
    driverName: '',
    driverDLNumber: '',
    driverContactNumber: '',
    model: '',
    id: '',
    transporterName: '',
    contactNumber: '',
    email: '',
    address: '',
     membershipId: '',
    supplierId: '',
    supplierName: '',
    supplierAddress: '',
    supplierContact: '',
    supplierEmail: '',
    materialId: '',
    materialName: '',
    materialType: '',
    parameter1Name: '',
    parameter1Value: '',
    parameter2Name: '',
    parameter2Value: '',
    inboundOutbound: '',
  });

  const [searchInput, setSearchInput] = useState('');
  const [transporters, setTransporters] = useState([]);
  const [selectedTransporter, setSelectedTransporter] = useState('');
  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState('');
  const [materials, setMaterials] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [transportersResponse, suppliersResponse, materialsResponse] = await Promise.all([
          fetch('http://localhost:7070/api/v1/transporters'),
          fetch('http://localhost:7070/api/v1/suppliers'),
          fetch('http://localhost:7070/api/v1/materials'),
        ]);

        const [transportersData, suppliersData, materialsData] = await Promise.all([
          transportersResponse.json(),
          suppliersResponse.json(),
          materialsResponse.json(),
        ]);

        setTransporters(transportersData);
        setSuppliers(suppliersData);
        setMaterials(materialsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:7070/api/v1/gate-user/transaction/create', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Form data submitted successfully:', response.data);
      // Handle success case, e.g., show success message, redirect, etc.
    } catch (error) {
      console.error('Error submitting form data:', error);
      // Handle error case, e.g., show error message
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:7070/api/v1/vehicles/name/${searchInput}`);
      const data = response.data;
  
      if (data) {
        setFormData(data);
        // toast.success(` ${JSON.stringify(data)}`);
      } else {
        clearFormData();
        toast.info('No vehicle data found');
      }
    } catch (error) {
      console.error('Error fetching vehicle data:', error);
      clearFormData();
      toast.error(` ${error.response.data}`);
    }
  };

  const clearFormData = () => {
    setFormData({
      vehicleId: '',
      registrationNumber: '',
      vehicleName: '',
      vehicleNumber: '',
      driverName: '',
      driverDLNumber: '',
      driverContactNumber: '',
      model: '',
      id: '',
      transporterName: '',
      contactNumber: '',
      email: '',
      address: '',
       membershipId: '',
      supplierId: '',
      supplierName: '',
      supplierAddress: '',
      supplierContact: '',
      supplierEmail: '',
      materialId: '',
      materialName: '',
      materialType: '',
      parameter1Name: '',
      parameter1Value: '',
      parameter2Name: '',
      parameter2Value: '',
      inboundOutbound: '',
    });
  };

  const handleTransporterChange = async (e) => {
    const selectedTransporterName = e.target.value;
    setSelectedTransporter(selectedTransporterName);

    try {
      const response = await fetch(`http://localhost:7070/api/v1/transporters/name/${selectedTransporterName}`);
      const data = await response.json();
      setFormData({ ...formData, ...data });
    } catch (error) {
      console.error('Error fetching transporter data:', error);
    }
  };

  const handleSupplierChange = async (e) => {
    const selectedSupplierName = e.target.value;
    setSelectedSupplier(selectedSupplierName);

    try {
      const response = await fetch(`http://localhost:7070/api/v1/suppliers/name/${selectedSupplierName}`);
      const data = await response.json();
      setFormData({ ...formData, ...data });
    } catch (error) {
      console.error('Error fetching supplier data:', error);
    }
  };

  const handleMaterialChange = async (e) => {
    const selectedMaterialName = e.target.value;
    setSelectedMaterial(selectedMaterialName);

    try {
      const response = await fetch(`http://localhost:7070/api/v1/materials/name/${selectedMaterialName}`);
      const data = await response.json();
      setFormData({ ...formData, ...data });
    } catch (error) {
      console.error('Error fetching material data:', error);
    }
  };

 

  return (
    <div className='grid-container'>
    <Header OpenSidebar={OpenSidebar}/>
    <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
    <div className="container-page">
      <h2 className="text-center mb-4">Vehicle Information</h2>
      <div className="mb-3 d-flex justify-content-start">
        <div className="row w-100">
       
          <div className="col-md-2">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Vehicle Number"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            // style={{ maxWidth: '300px' }}

            />
          </div>
          <div className="col-md-2">
            <button type="button" className="btn btn-primary " onClick={handleSearch}>
              Search
            </button>
          </div>

          {/* ##########dropdown for Transporter ########### */}
          <div className="col-md-2">
            <select
              className="form-control"
              value={selectedTransporter}
              onChange={handleTransporterChange}
            >
              <option value="">Select Transporter</option>
              {transporters.map((transporter) => (
                <option key={transporter.id} value={transporter.transporterName}>
                  {transporter.transporterName}
                </option>
              ))}
            </select>
          </div>

          {/* ##########dropdown for Supplier ########### */}
          <div className="col-md-2">
            <select
              className="form-control"
              value={selectedSupplier}
              onChange={handleSupplierChange}
            >
              <option value="">Select Supplier</option>
              {suppliers.map((supplier) => (
                <option key={supplier.id} value={supplier.supplierName}>
                  {supplier.supplierName}
                </option>
              ))}
            </select>
          </div>
          {/* ##########dropdown for material ########### */}
          <div className="col-md-2">
            <select
              className="form-control"
              value={selectedMaterial}
              onChange={handleMaterialChange}
            >
              <option value="">Select Material</option>
              {materials.map((material) => (
                <option key={material.materialId} value={material.materialName}>
                  {material.materialName}
                </option>
              ))}
            </select>
          </div>
          {/* ##########dropdown for in/out bound ########### */}

          <div className="col-md-2">
  <select
    className="form-control"
    value={formData.inboundOutbound}
    onChange={(e) => handleChange({ target: { name: 'entryType', value: e.target.value } })}
  >
    <option value="">Select Inbound/Outbound</option>
    <option value="inbound">Inbound</option>
    <option value="outbound">Outbound</option>
  </select>
</div>




          </div>
      </div>
      
      <form className="gate-form w-100" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-3">
            <div className="mb-3">
              <label htmlFor="vehicleId" className="form-label">
                Vehicle ID
              </label>
              <input
                type="text"
                className="form-control"
                id="vehicleId"
                name="vehicleId"
                value={formData.vehicleId}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="mb-3">
              <label htmlFor="registrationNumber" className="form-label">
                Registration Number
              </label>
              <input
                type="text"
                className="form-control"
                id="registrationNumber"
                name="registrationNumber"
                value={formData.registrationNumber}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="mb-3">
              <label htmlFor="vehicleName" className="form-label">
                Vehicle Name
              </label>
              <input
                type="text"
                className="form-control"
                id="vehicleName"
                name="vehicleName"
                value={formData.vehicleName}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="mb-3">
              <label htmlFor="vehicleNumber" className="form-label">
                Vehicle Number
              </label>
              <input
                type="text"
                className="form-control"
                id="vehicleNumber"
                name="vehicleNumber"
                value={formData.vehicleNumber}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3">
            <div className="mb-3">
              <label htmlFor="driverName" className="form-label">
                Driver Name
              </label>
              <input
                type="text"
                className="form-control"
                id="driverName"
                name="driverName"
                value={formData.driverName}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="mb-3">
              <label htmlFor="driverDLNumber" className="form-label">
                Driver DL Number
              </label>
              <input
                type="text"
                className="form-control"
                id="driverDLNumber"
                name="driverDLNumber"
                value={formData.driverDLNumber}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="mb-3">
              <label htmlFor="driverContactNumber" className="form-label">
                Driver Contact Number
              </label>
              <input
                type="text"
                className="form-control"
                id="driverContactNumber"
                name="driverContactNumber"
                value={formData.driverContactNumber}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="mb-3">
              <label htmlFor="model" className="form-label">
                Model
              </label>
              <input
                type="text"
                className="form-control"
                id="model"
                name="model"
                value={formData.model}
                onChange={handleChange}
              />
            </div>
          </div>
{/* ############################### Transporter Dropdown Data  ################################ */}
<div className="mb-2 text-danger text-center" style={{ fontSize: '15px' }}>
  <span className="text-uppercase">Transporters Details </span>
</div>



<div className="col-md-3">
          <div className="mb-3">
            <label htmlFor="id" className="form-label">
              ID
            </label>
            <input
              type="text"
              className="form-control"
              id="transporterId"
              name="transporterId"
              value={formData.transporterId}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-md-3">
          <div className="mb-3">
            <label htmlFor="transporterName" className="form-label">
              Transporter Name
            </label>
            <input
              type="text"
              className="form-control"
              id="transporterName"
              name="transporterName"
              value={formData.transporterName}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-md-3">
          <div className="mb-3">
            <label htmlFor="contactNumber" className="form-label">
              Contact Number
            </label>
            <input
              type="text"
              className="form-control"
              id="contactNumber"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-md-3">
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-3">
          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
        </div>
        {/* <div className="col-md-3">
          <div className="mb-3">
            <label htmlFor="registrationNumber" className="form-label">
              Registration Number
            </label>
            <input
              type="text"
              className="form-control"
              id="registrationNumber"
              name="registrationNumber"
              value={formData.registrationNumber}
              onChange={handleChange}
            />
          </div>
        </div> */}
        <div className="col-md-3">
          <div className="mb-3">
            <label htmlFor="membershipId" className="form-label">
              Membership ID
            </label>
            <input
              type="text"
              className="form-control"
              id="membershipId"
              name="membershipId"
              value={formData.membershipId}
              onChange={handleChange}
            />
          </div>
        </div>
{/* ############################### Supplier Dropdown Data  ################################ */}
<div className="mb-2 text-danger text-center" style={{ fontSize: '15px' }}>
  <span className="text-uppercase">Suppliers Details </span>
</div>

<div className="col-md-3">
          <div className="mb-3">
            <label htmlFor="supplierId" className="form-label">
              Supplier ID
            </label>
            <input
              type="text"
              className="form-control"
              id="supplierId"
              name="supplierId"
              value={formData.supplierId}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-md-3">
          <div className="mb-3">
            <label htmlFor="supplierName" className="form-label">
              Supplier Name
            </label>
            <input
              type="text"
              className="form-control"
              id="supplierName"
              name="supplierName"
              value={formData.supplierName}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-md-3">
          <div className="mb-3">
            <label htmlFor="supplierAddress" className="form-label">
              Supplier Address
            </label>
            <input
              type="text"
              className="form-control"
              id="supplierAddress"
              name="supplierAddress"
              value={formData.supplierAddress}
              onChange={handleChange}
            />
          </div>
        </div>
       
        <div className="col-md-3">
          <div className="mb-3">
            <label htmlFor="supplierContact" className="form-label">
              Supplier Contact
            </label>
            <input
              type="text"
              className="form-control"
              id="supplierContact"
              name="supplierContact"
              value={formData.supplierContact}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-md-3">
          <div className="mb-3">
            <label htmlFor="supplierEmail" className="form-label">
              Supplier Email
            </label>
            <input
              type="email"
              className="form-control"
              id="supplierEmail"
              name="supplierEmail"
              value={formData.supplierEmail}
              onChange={handleChange}
            />
          </div>
        </div>

{/* ############################### Material Dropdown Data  ################################ */}
<div className="mb-2 text-danger text-center" style={{ fontSize: '15px' }}>
  <span className="text-uppercase">Material Details </span>
</div>

        <div className="col-md-3">
          <div className="mb-3">
            <label htmlFor="materialId" className="form-label">
              Material ID
            </label>
            <input
              type="text"
              className="form-control"
              id="materialId"
              name="materialId"
              value={formData.materialId}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-md-3">
          <div className="mb-3">
            <label htmlFor="materialName" className="form-label">
              Material Name
            </label>
            <input
              type="text"
              className="form-control"
              id="materialName"
              name="materialName"
              value={formData.materialName}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-md-3">
          <div className="mb-3">
            <label htmlFor="materialType" className="form-label">
              Material Type
            </label>
            <input
              type="text"
              className="form-control"
              id="materialType"
              name="materialType"
              value={formData.materialType}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-3">
          <div className="mb-3">
            <label htmlFor="parameter1Name" className="form-label">
              Parameter 1 Name
            </label>
            <input
              type="text"
              className="form-control"
              id="parameter1Name"
              name="parameter1Name"
              value={formData.parameter1Name}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-md-3">
          <div className="mb-3">
            <label htmlFor="parameter1Value" className="form-label">
              Parameter 1 Value
            </label>
            <input
              type="text"
              className="form-control"
              id="parameter1Value"
              name="parameter1Value"
              value={formData.parameter1Value}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-md-3">
          <div className="mb-3">
            <label htmlFor="parameter2Name" className="form-label">
              Parameter 2 Name
            </label>
            <input
              type="text"
              className="form-control"
              id="parameter2Name"
              name="parameter2Name"
              value={formData.parameter2Name}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-md-3">
          <div className="mb-3">
            <label htmlFor="parameter2Value" className="form-label">
              Parameter 2 Value
            </label>
            <input
              type="text"
              className="form-control"
              id="parameter2Value"
              name="parameter2Value"
              value={formData.parameter2Value}
              onChange={handleChange}
            />
          </div>
        </div>

        </div>
        
        <div className="text-center">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default GateUser;
