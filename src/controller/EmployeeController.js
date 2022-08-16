import express from 'express';
import { employee }  from '../service/EmployeeService.js';
import { configuration } from '../config/config.js';
import { helperUtil } from '../helper/healper.js';

const router = express.Router();
const employeeService = employee();
const config = configuration();
const helper = helperUtil();


router.get('/', getEmployees);
router.get('/:employeeId', getEmployeeById);

router.post('/', createEmployee);

router.put('/:employeeId', updateEmployee);

router.delete('/:employeeId', deleteEmployee);

/**
 * Creates a new Employee
 * accept Employee Object
 * returns created Employee Object
 */
 function createEmployee(req, res) {
    employeeService.createEmployee(req.body).then(createdEmployee => {
        if(createdEmployee.err) {
            res.status(config.status.BAD_REQUEST).send(createdEmployee.err);
        }
    res.status(config.status.CREATED).send(createdEmployee);
    }).catch(error => {
        res.status(config.status.BAD_REQUEST).send({ error: error.message });
    });
    
}

function getEmployees(req, res) {
    const isDeleted = helper.isNullUndefinedOrEmpty(req.query.isDeleted) ? false : req.query.isDeleted;
    employeeService.getEmployees(isDeleted).then(employee => {
        res.status(config.status.SUCCESS).send(employee);
    });
}

function getEmployeeById(req, res) {
    const employeeId = req.params.employeeId;
    if(employeeId.match(config.regex.id)) {
        employeeService.getEmployeeById(employeeId).then(employee => {
            if(employee.length > 0) {
            res.status(config.status.SUCCESS).send({employee: employee[0]});
            } else {
            res.status(config.status.NOT_FOUND).send({ error: helper.formatString(config.errorMessage.NOTFOUND, employeeId)});
            return
            }
        });
    } else {
        res.status(config.status.BAD_REQUEST).send({ error: helper.formatString(config.errorMessage.INVALID, employeeId)});
    }
}

function updateEmployee(req, res) {
    const employeeId = req.params.employeeId;
    if(!employeeId.match(config.regex.id)) {
        res.status(config.status.BAD_REQUEST).send({ error: helper.formatString(config.errorMessage.INVALID, employeeId)});
        return;
    }
    employeeService.updateEmployee(employeeId, req.body).then(updateEmployee => {
        if(updateEmployee !== null) {
            res.status(config.status.UPDATED).send(updateEmployee);
        } else {
            res.status(config.status.BAD_REQUEST).send({error: helper.formatString(config.errorMessage.NOTFOUND, employeeId) });
        }
    }).catch(error => {
        res.status(config.status.BAD_REQUEST).send({ error: error });
    });
}

function deleteEmployee(req, res) {
    const employeeId = req.params.employeeId;
    if(!employeeId.match(config.regex.id)) {
        res.status(config.status.BAD_REQUEST).send({ error: helper.formatString(config.errorMessage.INVALID, employeeId)});
        return;
    }
    employeeService.deleteEmployee(employeeId).then((deleted) => {
        if(deleted !== null) {
            res.status(config.status.SUCCESS).send({error: helper.formatString(config.errorMessage.DELETED, employeeId) });
        } else {
            res.status(config.status.BAD_REQUEST).send({error: helper.formatString(config.errorMessage.NOTFOUND, employeeId) });
        }
    }).catch(error => {
        res.status(config.status.BAD_REQUEST).send({ error: error });
    });
}

export default router;