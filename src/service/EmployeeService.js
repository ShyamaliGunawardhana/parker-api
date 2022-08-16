import { employeeRepo } from '../repository/EmployeeRepository.js'
const employeeRepository = employeeRepo();

function getEmployees(isDeleted) {
    return employeeRepository.getEmployees(isDeleted);
}

function getEmployeeById(employeeId) {
    return employeeRepository.getEmployeeById(employeeId);
}

function createEmployee(employee) {
    employee.created_at = new Date();
    return new Promise((resolve, reject) => {
        employeeRepository.createEmployee(employee).then(created => {
            let employee = created.toObject();
            delete employee['password'];
            resolve(employee);
        }).catch(error => {
            reject(error);
        });;    
    });    
}

function updateEmployee(employeeId, employee) {
    employee.modified_at = new Date();
    return new Promise((resolve, reject) => {
        employeeRepository.updateEmployee(employeeId, employee).then(updated => {
            let employee = updated.toObject();
            delete employee['password'];
            resolve(employee);
        }).catch(error => {
            reject(error);
        });;    
    }); 
}

function deleteEmployee(employeeId) {
    return employeeRepository.deleteEmployee(employeeId);
}

export function employee() {
    return {
        getEmployees: getEmployees,
        createEmployee: createEmployee,
        getEmployeeById: getEmployeeById,
        updateEmployee: updateEmployee,
        deleteEmployee: deleteEmployee
    }
}