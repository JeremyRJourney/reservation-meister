"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const router = express.Router();

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
const DeleteReservation = require('./handlers/DeleteReservation');
const CheckReservations = require('./handlers/CheckPossibleReservations')

express()
  // Below are methods that are included in express(). We chain them for convenience.
  // --------------------------------------------------------------------------------
  .use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(cors())
  // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
  .use(morgan("tiny"))
  .use(express.json())


  // Nothing to modify above this line
  // ---------------------------------
  // add new endpoints here 👇
  
  /*
  .get("/reservations/list", GetReservationList.GetReservationList)
  .get("/reservations/tables", GetReservationTables.GetReservationTables)
  .get("/tables/occupancy", GetTableOccupancy.GetTableOccupancy)
  .get("/tables", GetTables.GetTables)
  .get("/users/list", GetUserList.GetUserList)
  .get("/users/signout", SignOut.SignOut)
  .get("/users/signup/:id", SignUp.SignUp)

  .post("/reservations/available", CheckReservations.CheckReservations)
  .post("/users/signin", SignIn.SignIn)
  .post("/users/:id", UpdateUser.UpdateUser)
  .post("/reservations/:id", UpdateReservation.UpdateReservation)
  .post("/reservation/create", CreateReservation.CreateReservation)
  .post("/user/create", CreateUser.CreateUser)

  .delete("/users/:id", DeleteUser.DeleteUser)
  .delete("/reservations/:id", DeleteReservation.DeleteReservation)
  */

  // PROD 
  
  
  .get("/api/reservations/list", GetReservationList.GetReservationList)
  .get("/api/reservations/tables", GetReservationTables.GetReservationTables)
  .get("/api/tables/occupancy", GetTableOccupancy.GetTableOccupancy)
  .get("/api/tables", GetTables.GetTables)
  .get("/api/users/list", GetUserList.GetUserList)
  .get("/api/users/signout", SignOut.SignOut)
  .get("/api/users/signup/:id", SignUp.SignUp)

  .post("/api/reservations/available", CheckReservations.CheckReservations)
  .post("/api/users/signin", SignIn.SignIn)
  .post("/api/users/:id", UpdateUser.UpdateUser)
  .post("/api/reservations/:id", UpdateReservation.UpdateReservation)
  .post("/api/reservation/create", CreateReservation.CreateReservation)
  .post("/api/user/create", CreateUser.CreateUser)

  .delete("/api/users/:id", DeleteUser.DeleteUser)
  .delete("/api/reservations/:id", DeleteReservation.DeleteReservation)
  
  
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