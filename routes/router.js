const express = require('express');
const router = express.Router();
const transactionPostRouteFunc = require('./transactionPostRoute.js')
const transactionGetRouteFunc = require('./transactionGetRoute.js')

// router middleware to parse JSON body
router.use(express.json());

// Route to post a transaction
router.post('/transaction', transactionPostRouteFunc)

// Router to retrieve transactions
router.get('/transaction', transactionGetRouteFunc)

module.exports = router