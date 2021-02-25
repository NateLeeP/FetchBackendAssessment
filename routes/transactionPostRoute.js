
const transactions = require('./memory.js');


module.exports = (req, res) => {
  var {payer, points, date, time} = req.body;
  if (payer === undefined || points === undefined) {
    res.status(500).send("Error! Transaction not accepted. Did you send data in JSON format?")
  } else {
    var timestamp = date + 'T' + time + ':00Z'
    var newTransactions = {payer, points, timestamp: date === undefined ? new Date() : new Date(timestamp)}
    transactions.push(newTransactions);
    res.status(201).send('Transaction Added')
  }




}