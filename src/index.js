const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080

// Parse JSON bodies (as sent by API clients)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const connection = require('./connector');


app.get(`/api/orders`,async(req,res)=>{
  const {limit,offset} = req.query;

  if(!limit && !offset || !Number.isInteger(limit) || !Number.isInteger(offset)) {
   const qry = `SELECT * FROM ORDERS LIMIT 10 OFFSET 0`;
   connection.query(qry,(err,response)=>{
      if(err) {
         console.log("not response from db due to ",err);
      }else{
         res.status(200).json(response);
      }
   })
  }

  else{
   const qry = `SELECT * FROM ORDERS LIMIT ${limit} OFFSET ${offset}`;
   connection.query(qry,(err,response)=>{
      if(err) {
         console.log("no response from db due to ",err);

      }else{
         res.status(200).json(response);
      }
   })
  }
});

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;
