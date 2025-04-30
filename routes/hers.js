var express = require('express');
const { AddHers, GetAllHers, HersDetails } = require('../controllers/herscontroller');
var router = express.Router();

router.post('/addhers',AddHers);
router.get('/getallhers',GetAllHers)
router.get('/hersdetails/:hers_Id',HersDetails);
module.exports = router;