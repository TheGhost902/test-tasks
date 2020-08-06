import React from 'react'

import './EmployeesPage.scss'

import { Employee } from '../Employee'
import { NewEmployeeForm } from '../NewEmployeeForm'

export function EmployeesPage() {
    const [employees, setEmployees] = React.useState([])

    React.useEffect(() => {
        fetch('https://reqres.in/api/users?per_page=12')
            .then(res => res.json())
            .then(res => setEmployees(res.data))
    }, [])

    function deleteEmployee(id) {
        const employeesList = employees.filter(employee => employee.id !== id)
        
        setEmployees(employeesList)
    }

    function formSubmit(data) {
        const { first_name, last_name } = data

        setEmployees([
            ...employees,
            {
                id: employees[employees.length - 1].id + 1,
                first_name,
                last_name
            }
        ])
    }

    return (
        <div className="employees-page">
            <NewEmployeeForm submit={formSubmit}/>
            
            <ul>
                {employees.length
                    ? employees.map(employee =>
                        <Employee key={employee.id} data={employee} deleteFn={deleteEmployee}/>)
                    : <p className="employees-page__loading">Loading...</p>}
            </ul>
        </div>
    )
}