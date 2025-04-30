var express = require('express');
const { AddTriggerHers, GetAllTriggerHers, TriggerHersDetails } = require('../controllers/triggerherscontroller');
var router = express.Router();

router.post('/addtriggerhers',AddTriggerHers);
router.get('/getalltriggerhers',GetAllTriggerHers)
router.get('/triggerhersdetails/:triggerhers_Id',TriggerHersDetails);
module.exports = router;