const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080

// Parse JSON bodies (as sent by API clients)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const connection = require('./connector')

app.get('/api/orders', async (req, res) => {
  let limit = 10;
  let offset = 0;
  if (req.query.limit && req.query.offset) {
    limit = req.query.limit;
    offset = req.query.offset;
  }
  else if (req.query.limit) {
    limit = req.query.limit;
  }
  else if (req.query.offset) {
    offset = req.query.offset;
  }

  // let regexPattern = /^-?[0-9]+$/;
  let regexPattern = /^\+?(0|[1-9]\d*)$/; //  for checking Negative value

  // check if the passed number is integer or not
  let resultLimit = regexPattern.test(limit);
  let resultOffset = regexPattern.test(offset);

  if (!resultLimit) {
    limit = 10;
  }
  if (!resultOffset) {
    offset = 0;
  }

  const q = `SELECT * FROM orders LIMIT ${limit} OFFSET ${offset}`;
  connection.query(q, (err, response) => {
    if (err) {
      return console.log(err);
    }
    return res.status(200).send(response);
  })
})

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;
