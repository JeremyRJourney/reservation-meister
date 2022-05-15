"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");


// Require the DATA
const GetReservationList = require('./handlers/GetReservationList')
const GetReservationTables = require('./handlers/GetReservationTables');
const GetTableOccupancy = require("./handlers/GetTableOccupancy");
const GetUserList = require("./handlers/GetUserList");
const SignIn = require('./handlers/SignIn')
const GetTables = require('./handlers/GetTables')
const SignUp = require('./handlers/Signup')
const SignOut = require('./handlers/SignOut')
const UpdateUser = require('./handlers/UpdateUser')
const UpdateReservation = require('./handlers/UpdateReservation')
const CreateReservation = require('./handlers/CreateReservation')
const CreateUser = require('./handlers/CreateUser')
const DeleteUser = require('./handlers/DeleteUser')
const DeleteReservation = require('./handlers/DeleteReservation')

express()
  // Below are methods that are included in express(). We chain them for convenience.
  // --------------------------------------------------------------------------------
  .use(cors())
  // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
  .use(morgan("tiny"))
  .use(express.json())


  // Nothing to modify above this line
  // ---------------------------------
  // add new endpoints here 👇
  .get("/reservations/list", GetReservationList.GetReservationList)
  .get("/reservations/tables", GetReservationTables.GetReservationTables)
  .get("/tables/occupancy", GetTableOccupancy.GetTableOccupancy)
  .get("/tables", GetTables.GetTables)
  .get("/users/list", GetUserList.GetUserList)
  .get("/users/signout", SignOut.SignOut)

  .post("/users/signin", SignIn.SignIn)
  .post("/users/signup/:uid", SignUp.SignUp)
  .post("/users/:id", UpdateUser.UpdateUser)
  .post("/reservations/:id", UpdateReservation.UpdateReservation)
  .post("/reservations/create", CreateReservation.CreateReservation)
  .post("/users/create", CreateUser.CreateUser)

  .delete("/users/:id", DeleteUser.DeleteUser)
  .delete("/reservations/:id", DeleteReservation.DeleteReservation)
  
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