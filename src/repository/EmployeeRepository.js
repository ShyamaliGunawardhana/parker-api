import mongoose from 'mongoose';

let employeeSchema = mongoose.Schema({
    id: { type: mongoose.Schema.ObjectId },
    name: {type: String, required: true },
    username: {type: String, required: true, unique: true },
    profile_picture: {type: String, required: false },
    created_at: {type: Date },
    modified_at: {type: Date },
    isDeleted: {type: Boolean, default: false }
});
    
const employeeModel = mongoose.model('employees', employeeSchema);

function getEmployeeById(employeeId) {
    return new Promise((resolve, reject) => {
        employeeModel.find({_id: employeeId, isDeleted: false}).select("-password").then(employee => {
            resolve(employee);
        }).catch(error => {
            reject(error);
        });
    });
}

function getEmployees(isDeleted = false) {
    return new Promise((resolve, reject) => {
        employeeModel.find({isDeleted: isDeleted}).then(employees => {
            resolve({employees : employees});
        }).catch(error => {
            reject(error);
        });
    });
}

function createEmployee(employee) {
    let createdEmployee = new employeeModel(employee);
    return new Promise((resolve, reject) => {
        createdEmployee.save(employee).then(newEmployee => {
            resolve(newEmployee);
        }).catch(error => {
            reject(error);
        });
    });
}

function updateEmployee(employeeId, employee) {
    return new Promise((resolve, reject) => {
        employeeModel.findOneAndUpdate({ _id: employeeId, isDeleted: false }, employee, {returnOriginal:false}).then(updatedEmployee => {
            resolve(updatedEmployee);
        }).catch(error => {
            reject(error);
        });
    });
}

function deleteEmployee(employeeId) {
    return new Promise((resolve, reject) => {
        employeeModel.findOneAndUpdate({ _id: employeeId, isDeleted: false }, {isDeleted: true}, {returnOriginal:false}).then(deletedEmployee => {
            resolve(deletedEmployee);
        }).catch(error => { 
            reject(error);
        });
    });
}

export function employeeRepo() {
    return {
        getEmployeeById: getEmployeeById,
        getEmployees: getEmployees,
        createEmployee: createEmployee,
        updateEmployee: updateEmployee,
        deleteEmployee: deleteEmployee
    }
}
