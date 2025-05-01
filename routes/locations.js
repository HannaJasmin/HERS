var express = require('express');
const { AddLocations, GetAllLocations, LocationsDetails } = require('../controllers/locations');
var router = express.Router();

router.post('/addlocations',AddLocations);
router.get('/getalllocations',GetAllLocations)
router.get('/locationsdetails/:locations_Id',LocationsDetails);
module.exports =router;