import axios from "axios";

const REST_API_BASE_URL='http://localhost:7070/api/v1/suppliers';

//simplified version
export const listSuppliers =() => axios.get(REST_API_BASE_URL);


// export const listEmployees = () => {
//     return axios.get(REST_API_BASE_URL);
// }

export const createEmployee = (employee) => axios.post(REST_API_BASE_URL, employee);

export const getEmployee= (employeeId) => axios.get(REST_API_BASE_URL+ '/'+ employeeId);
