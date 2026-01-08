import axios from 'axios'

const EMPLOYEE_BASE_REST_API_URL = 'http://localhost:8080/api/v1/employees';

export const listEmployees = () => {
    return axios.get(EMPLOYEE_BASE_REST_API_URL)
};

export const createEmployee = (employee) => {
    return axios.post(EMPLOYEE_BASE_REST_API_URL, employee)
}

export const getEmployeeById = (employeeId) => {
    return axios.get(EMPLOYEE_BASE_REST_API_URL + '/' + employeeId);
}

export const updateEmployee = (employeeId, employee) => {
    return axios.put(EMPLOYEE_BASE_REST_API_URL + '/' +employeeId, employee);
}

export const deleteEmployee = (employeeId) => {
    return axios.delete(EMPLOYEE_BASE_REST_API_URL + '/' + employeeId);
}