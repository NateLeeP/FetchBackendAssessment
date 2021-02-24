const express = require('express');
const router = express.Router();
const transactionPostRouteFunc = require('./transactionPostRoute.js')
const transactionGetRouteFunc = require('./transactionGetRoute.js')
const spendPutFunc = require('./spendPutRoute.js');
const pointsBalanceFunc = require('./pointsBalanceGetRoute.js')
// router middleware to parse JSON body
router.use(express.json());

// Route to post a transaction
router.post('/transaction', transactionPostRouteFunc)

// Router to retrieve transactions
router.get('/transaction', transactionGetRouteFunc)

// Route to spend points
router.put('/spend', spendPutFunc)

// Get point balances
router.get('/balance', pointsBalanceFunc)

module.exports = router