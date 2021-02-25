# Fetch Backend Assessment
Backend service for tracking client transactions and payer point totals

## Installation

After cloning repository, install neccessary dependencies with
```
npm install
```

To start server running at http://localhost:3000, run
```
npm start
```

## Endpoints
Interact with the service using the following endpoints:

`GET /transaction`

Responds with array of transaction objects. Note: These are __NOT__ guaranteed to be in chronilogical order


`POST /transaction`

Add a new transaction.

Body Parameters

| Parameter    | Type    | Description                                                    |
| ------------ | ------- | ---------------------------------------------------------------|
| payer        | string  | Name of payer.                                                 |
| points       | integer | Points added/subtracted during transaction.                    |
| date         | string  | Date in form of 'YYYY-MM-DD' E.G: 2021-02-25                   |
| time         | string  | Time in military E.G: 11:30 for 11:30 a.m., 14:30 for 2:30 p.m.|

Response: `201 Transaction Added`

`PUT /spend`
Spend points from customer balances.

| Parameter    | Type    | Description       |
| ------------ | ------- | ----------------- |
| points       | integer | points spent      |

Response: Array of objects showing total points subtracted from each payer

`GET /balance`
Current point balances

Reponse: JSON object with key-value pairs corresponding to payer-point totals

## Test

To test service against provided example, run

```
npm test
```

