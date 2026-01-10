import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { updateEmployee, createEmployee, getEmployeeById } from '../EmployeeService'

const EmployeeComponent = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [errors, setErrors] = useState({})

    const navigate = useNavigate()
    const { id } = useParams()

    const nameRegex = /^[A-Za-z\s]+$/
    const numberRegex = /^[0-9]+$/

    const validateForm = () => {
        let tempErrors = {}

        if (!firstName.trim()) {
            tempErrors.firstName = "Required"
        } else if (!nameRegex.test(firstName)) {
            tempErrors.firstName = "Only letters are allowed"
        }

        if (!lastName.trim()) {
            tempErrors.lastName = "Required"
        } else if (!nameRegex.test(lastName)) {
            tempErrors.lastName = "Only letters are allowed"
        }

        if (!email.trim()) {
            tempErrors.email = "Required"
        } else if (!numberRegex.test(email)) {
            tempErrors.email = "Only numbers are allowed"
        }

        setErrors(tempErrors)
        return Object.keys(tempErrors).length === 0
    }

    // Real-time validation (on change)
    const handleChange = (field, value) => {
        let tempErrors = { ...errors }

        if (field === "firstName") {
            setFirstName(value)
            if (!value.trim()) {
                tempErrors.firstName = "Insurance Name is required"
            } else if (!nameRegex.test(value)) {
                tempErrors.firstName = "Only letters are allowed"
            } else {
                delete tempErrors.firstName
            }
        }

        if (field === "lastName") {
            setLastName(value)
            if (!value.trim()) {
                tempErrors.lastName = "Insurance Type is required"
            } else if (!nameRegex.test(value)) {
                tempErrors.lastName = "Only letters are allowed"
            } else {
                delete tempErrors.lastName
            }
        }

        if (field === "email") {
            setEmail(value)
            if (!value.trim()) {
                tempErrors.email = "Insurance Coverage is required"
            } else if (!numberRegex.test(value)) {
                tempErrors.email = "Only numbers are allowed"
            } else {
                delete tempErrors.email
            }
        }

        setErrors(tempErrors)
    }

    const saveOrUpdateEmployee = (e) => {
        e.preventDefault()
        if (!validateForm()) return

        const employee = { firstName, lastName, email }

        if (id) {
            updateEmployee(id, employee).then(() => navigate('/employees'))
        } else {
            createEmployee(employee).then(() => navigate('/employees'))
        }
    }

    useEffect(() => {
        if (id) {
            getEmployeeById(id).then((response) => {
                setFirstName(response.data.firstName)
                setLastName(response.data.lastName)
                setEmail(response.data.email)
            })
        }
    }, [id])

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="card col-md-6 offset-md-3">
                    <h2 className="text-center">Insurance</h2>

                    <div className="card-body">
                        <form onSubmit={saveOrUpdateEmployee}>

                            {/* Insurance Name */}
                            <div className="mb-3">
                                <label>Insurance Name </label>
                                <input
                                    type="text"
                                    placeholder='Enter Name'
                                    className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                    value={firstName}
                                    onChange={(e) => handleChange("firstName", e.target.value)}
                                />
                                <div className="invalid-feedback">{errors.firstName}</div>
                            </div>

                            {/* Insurance Type */}
                            <div className="mb-3">
                                <label>Insurance Type</label>
                                <input
                                    type="text"
                                    placeholder='Enter Type'
                                    className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                    value={lastName}
                                    onChange={(e) => handleChange("lastName", e.target.value)}
                                />
                                <div className="invalid-feedback">{errors.lastName}</div>
                            </div>

                            {/* Insurance Coverage */}
                            <div className="mb-3">
                                <label>Insurance Coverage</label>
                                <input
                                    type="text"
                                    placeholder='Enter Coverage'
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    value={email}
                                    onChange={(e) => handleChange("email", e.target.value)}
                                />
                                <div className="invalid-feedback">{errors.email}</div>
                            </div>

                            <button className="btn btn-success">Save</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmployeeComponent



