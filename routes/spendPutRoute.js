const transactions = require('./memory.js');

const pointsSpent = (transaction, transactionIndex) => {
  // Helper function for determining how many points can be taken from given transaction

  // Rule #1: Cannot take points that would cause a negative balance down the line.
  // Rule #2: Points must be taken from oldest dated transaction

  // If transaction points are negative, return 0. Cannot extract any points from negative transaction
  if (transaction['points'] <= 0) {
    return 0;
  }
  // Find minimum of cumulative total, moving chronilogically from this transaction.
  // The minimum of the cumlative total is how many points can be taken from a given transaction without going negative
  var cumulativeTotal = transaction['points']
  var cumulativeMin = transaction['points']

  // Loop through transactions occuring after current transaction

  for (var i = transactionIndex + 1; i < transactions.length; i++) {
    if (transaction['payer'] === transactions[i]['payer']) {
      cumulativeTotal += transactions[i]['points'];
      if (cumulativeTotal < cumulativeMin) {
        cumulativeMin = cumulativeTotal
      }
    }
  }


  return cumulativeMin;
}


// Spend points route function
module.exports = (req, res) => {
  // Points needed
  var {points} = req.body
  // Track what payer points are being spent
  var payerPointsSpent = {}
  // Sort transactions by time stamp
  transactions.sort((a, b) => (a.timestamp - b.timestamp))

  var index = 0;
  // Loop through transactions. For each, find out how many points can be taken
  while (points > 0 && index < transactions.length) {
      var ptsAvailable = pointsSpent(transactions[index], index)
      if (ptsAvailable > points) {
        // If more points available than needed
        ptsAvailable = points;
      }
      // Subtract points available from transaction total
      points -= ptsAvailable;
      if (ptsAvailable > 0) {
        // If more than 0 points available, keep track in "payerPointsSpent" object
        if (payerPointsSpent[transactions[index]['payer']]) {
          payerPointsSpent[transactions[index]['payer']] -= ptsAvailable;
        } else {
          payerPointsSpent[transactions[index]['payer']] = ptsAvailable * (-1);
        }
        // Subtract from transaction in memory

        transactions[index]['points'] -= ptsAvailable;
      }
      index++;

  }
  if (points > 0) {
    // Handle case where not enough points are available
    res.status(200).send("Not enough points available for transaction!")
  }
  /// modify payerPointsSpent object to array
  var pointsSpentArray = [];
  for (var key of Object.keys(payerPointsSpent)) {
    pointsSpentArray.push({"payer":key, "points": payerPointsSpent[key]})
  }
  res.status(201).send(pointsSpentArray)
}

