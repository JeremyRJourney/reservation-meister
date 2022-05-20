"use strict"

const { ObjectId } = require("bson")

require("dotenv").config();
const { MONGO_URI } = process.env;

const { MongoClient } = require("mongodb");
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

exports.UpdateReservation = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);

    try {
        const todaysDate = new Date()

        let month = (todaysDate.getMonth())+1
        if (month.toString().length === 1) {
            month = `0${month}`;
        }
    
        const formattedDate = todaysDate.getFullYear() + "-" + month + "-" + todaysDate.getDate()

        let status = null
        const currentDate = new Date()
        const reserveDate = new Date(formattedDate+"T"+req.body.time+":00")
        if (Date.parse(currentDate) < Date.parse(reserveDate))
            status = 'none'
        else
            status = req.body.status

        await client.connect();
        const db = client.db("project");
        const user = await db.collection("reservations").updateOne(
            { "_id":  ObjectId(req.params.id)},
            {
                $set: {
                    "tableName": req.body.tableName,
                    "firstName": req.body.firstName,
                    "lastName": req.body.lastName,
                    "guests": req.body.guests,
                    "time": formattedDate+"T"+req.body.time+":00",
                    "status": status,
                    "notes": req.body.notes,
                }
            }
        )
        if (user) {
            res.status(200).json({
                data: {
                    tableName: req.body.tableName,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    guests: req.body.guests,
                    time: req.body.time,
                    status: req.body.status,
                    notes: req.body.notes    
                }
            })
        } else {
            res.status(404).json({
                message: "reservations not found"
            })
        }

    } catch {
        res.status(500).json({
            message: "server error"
        })
    }
    client.close()
}

