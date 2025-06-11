const express = require('express');
const router = express.Router();
const controller = require('../controllers/settlementController');

router.get('/people', controller.getPeople);
router.get('/balances', controller.getBalances);
router.get('/settlements', controller.getSettlements);

module.exports = router;
