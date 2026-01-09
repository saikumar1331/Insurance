import React, {useState, useEffect} from 'react'
import {useNavigate, useParams } from 'react-router-dom';
import { updateEmployee, createEmployee, getEmployeeById} from '../EmployeeService';

const EmployeeComponent = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')

    const navigate = useNavigate();
    const {id} = useParams();

    const saveOrUpdateEmployee = (e) => {
        e.preventDefault();

        const employee = {firstName, lastName, email}

        console.log(employee);
        if(id){
            updateEmployee(id, employee).then((response) => {
                navigate('/employees')
            }).catch(error => {
                console.log(error)
            })

        }else{
            createEmployee(employee).then((response) =>{

                console.log(response.data)
    
                navigate('/employees');
    
            }).catch(error => {
                console.log(error)
            })
        }
        
    }

    useEffect(() => {

        if(id){
            getEmployeeById(id).then((response) =>{
                setFirstName(response.data.firstName)
                setLastName(response.data.lastName)
                setEmail(response.data.email)
            }).catch(error => {
                console.log(error)
            })
        }

    }, [id])

    const pageTitle = () => {

        if(id){
            return <h2 className = "text-center">Update Employee</h2>
        }else{
            return <h2 className = "text-center">Add Employee</h2>
        }
    }

    return (
        <div>
           <br /><br />
           <div className = "container">
                <div className = "row">
                    <div className = "card col-md-6 offset-md-3 offset-md-3">
                        <h2>Insurance</h2>
                        <div className = "card-body">
                            <form>
                                <div c lassName = "form-group mb-2">
                                    <label className = "form-label"> Insurance Name :</label>
                                    <input
                                        type = "text"
                                        placeholder = "Enter Insurance Name"
                                        name = "firstName"
                                        className = "form-control"
                                        value = {firstName}
                                
                                        onChange = {(e) => setFirstName(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Insurance Type :</label>
                                    <input
                                        type = "text"
                                        placeholder = "Enter Type"
                                        name = "Insurance Type"
                                        className = "form-control"
                                        
                                        value = {lastName}
                                        onChange = {(e) => setLastName(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <div className = "form-group mb-2">
                                    <label className = "form-label">Insurance Coverage :</label>
                                    <input
                                        type = "text"
                                        placeholder = "Enter Coverage"
                                        name = "email"
                                        className = "form-control"
                                        value = {email}
                                        onChange = {(e) => setEmail(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <button className = "btn btn-success" onClick = {(e) => saveOrUpdateEmployee(e)} >Save </button>
                         </form>
                        </div>
                    </div>
                </div>
           </div>
        </div>
    )
}

export default EmployeeComponent

/*import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { updateEmployee, createEmployee, getEmployeeById } from '../EmployeeService';

const EmployeeComponent = () => {

    const [insuranceType, setInsuranceType] = useState('');
    const [insurancePolicy, setInsurancePolicy] = useState('');
    const [insuranceCoverage, setInsuranceCoverage] = useState('');
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();
    const { id } = useParams();

    const onlyLetters = /^[A-Za-z\s]+$/;
    const onlyNumbers = /^[0-9]+$/;


    const handleInsuranceType = (e) => {
        const value = e.target.value;
        setInsuranceType(value);

        if (!value) {
            setErrors(prev => ({ ...prev, insuranceType: "Required" }));
        } else if (!onlyLetters.test(value)) {
            setErrors(prev => ({ ...prev, insuranceType: "Only letters allowed" }));
        } else {
            setErrors(prev => ({ ...prev, insuranceType: "" }));
        }
    };

    const handleInsurancePolicy = (e) => {
        const value = e.target.value;
        setInsurancePolicy(value);

        if (!value) {
            setErrors(prev => ({ ...prev, insurancePolicy: "Required" }));
        } else if (!onlyLetters.test(value)) {
            setErrors(prev => ({ ...prev, insurancePolicy: "Only letters allowed" }));
        } else {
            setErrors(prev => ({ ...prev, insurancePolicy: "" }));
        }
    };

    const handleInsuranceCoverage = (e) => {
        const value = e.target.value;
        setInsuranceCoverage(value);

        if (!value) {
            setErrors(prev => ({ ...prev, insuranceCoverage: "Required" }));
        } else if (!onlyNumbers.test(value)) {
            setErrors(prev => ({ ...prev, insuranceCoverage: "Only numbers allowed" }));
        } else {
            setErrors(prev => ({ ...prev, insuranceCoverage: "" }));
        }
    };


    const validateOnSubmit = () => {
        let newErrors = {};

        if (!insuranceType) newErrors.insuranceType = "Required";
        if (!insurancePolicy) newErrors.insurancePolicy = "Required";
        if (!insuranceCoverage) newErrors.insuranceCoverage = "Required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    const saveOrUpdateEmployee = (e) => {
        e.preventDefault();

        if (!validateOnSubmit()) return;

        const employee = {
            firstName: insuranceType,
            lastName: insurancePolicy,
            email: insuranceCoverage
        };

        if (id) {
            updateEmployee(id, employee)
                .then(() => navigate('/employees'))
                .catch(error => console.log(error));
        } else {
            createEmployee(employee)
                .then(() => navigate('/employees'))
                .catch(error => console.log(error));
        }
    };


    useEffect(() => {
        if (id) {
            getEmployeeById(id).then((response) => {
                setInsuranceType(response.data.firstName);
                setInsurancePolicy(response.data.lastName);
                setInsuranceCoverage(response.data.email);
            });
        }
    }, [id]);


    return (
        <div className="container mt-4">
            <div className="row">
                <div className="card col-md-6 offset-md-3">
                    <h2 className="text-center">Insurance</h2>

                    <div className="card-body">
                        <form onSubmit={saveOrUpdateEmployee}>

                           
                            <div className="mb-2">
                                <label>Insurance Type</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.insuranceType ? 'is-invalid' : ''}`}
                                    value={insuranceType}
                                    onChange={handleInsuranceType}
                                />
                                <div className="invalid-feedback">
                                    {errors.insuranceType}
                                </div>
                            </div>

                          
                            <div className="mb-2">
                                <label>Insurance Policy</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.insurancePolicy ? 'is-invalid' : ''}`}
                                    value={insurancePolicy}
                                    onChange={handleInsurancePolicy}
                                />
                                <div className="invalid-feedback">
                                    {errors.insurancePolicy}
                                </div>
                            </div>

                    
                            <div className="mb-3">
                                <label>Insurance Coverage</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.insuranceCoverage ? 'is-invalid' : ''}`}
                                    value={insuranceCoverage}
                                    onChange={handleInsuranceCoverage}
                                />
                                <div className="invalid-feedback">
                                    {errors.insuranceCoverage}
                                </div>
                            </div>

                            <button type="submit" className="btn btn-success w-100">
                                Submit
                            </button>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeComponent;*/

