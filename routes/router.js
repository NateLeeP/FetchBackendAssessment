const express = require('express');
const router = express.Router();
const transactionRouteFunc = require('./transactionRoute.js')

// Route to post a transaction
router.get('/transaction', transactionRouteFunc)

module.exports = router