var express = require('express');
const { AddDepartment_or_Rooms, GetAllDepartment_or_Rooms, Departments_or_RoomsDetails } = require('../controllers/departmentorroomscontroller');
var router = express.Router();

router.post('/adddepartmentorrooms',AddDepartment_or_Rooms);
router.get('/getalldepartmentorrooms',GetAllDepartment_or_Rooms)
router.get('/departmentorroomsdetails/:departments_or_rooms_Id',Departments_or_RoomsDetails);
module.exports =router;