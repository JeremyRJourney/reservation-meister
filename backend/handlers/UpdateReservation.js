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
        await client.connect();
        const db = client.db("project");
        const firstName = req.body.firstName
        const user = await db.collection("reservations").updateOne(
            { "_id":  ObjectId(req.params.id)},
            {
                $set: {
                    "tableName": req.body.tableName,
                    "firstName": req.body.firstName,
                    "lastName": req.body.lastName,
                    "guests": req.body.guests,
                    "time": req.body.time,
                    "status": req.body.status,
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

