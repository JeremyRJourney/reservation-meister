"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");

// Require the DATA
const GetReservationList = require('./handlers/GetReservationList')
const GetReservationTables = require('./handlers/GetReservationTables');
const GetTableOccupancy = require("./handlers/GetTableOccupancy");
//const GetUserList = require("./handlers/GetUserList");

express()
  // Below are methods that are included in express(). We chain them for convenience.
  // --------------------------------------------------------------------------------
  .use(function(req, res, next) {
    res.header(
      'Access-Control-Allow-Methods',
      'OPTIONS, HEAD, GET, PUT, POST, DELETE'
    );
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  })
  // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
  .use(morgan("tiny"))
  .use(express.json())


  // Nothing to modify above this line
  // ---------------------------------
  // add new endpoints here 👇
  .get("/reservations/list", GetReservationList.GetReservationList)
  .get("/reservations/tables", GetReservationTables.GetReservationTables)
  .get("/tables/occupancy", GetTableOccupancy.GetTableOccupancy)
  //.get("/users/list", GetUserList.GetUserList)
  // add new endpoints here ☝️
  // ---------------------------------
  // Nothing to modify below this line

  // this is our catch all endpoint.


  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  // Node spins up our server and sets it to listen on port 5000.
  .listen(5000, () => console.log(`Listening on port 5000`));