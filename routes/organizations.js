var express = require('express');
const { AddOrganizations, OrganizationsDetails, GetAllOrganizations } = require('../controllers/organizationscontroller');
var router = express.Router();

router.post('/addorganizations',AddOrganizations);
router.get('/getallorganizations',GetAllOrganizations)
router.get('/organizationsdetails/:organizations_Id',OrganizationsDetails);
module.exports =router;