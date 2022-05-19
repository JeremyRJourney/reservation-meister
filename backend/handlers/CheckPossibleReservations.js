"use strict"

require("dotenv").config();

const { MONGO_URI } = process.env;

const { response } = require("express");
const { MongoClient } = require("mongodb");
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};


exports.CheckReservations = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);

    try {
        let toReturn = []
        await client.connect();
        const db = client.db("project");
        const tables = await db.collection("tables").find().toArray()

        if (tables) {
            const reservations = await db.collection("reservations").find().toArray()
            if (reservations) {
                tables.forEach(table => {
                    if (table.tableType == req.body.guests) {
                        let isReserved = false
                        reservations.forEach(reserve => {
                            if (table.tableName === reserve.tableName)
                                isReserved = true
                        });
                        if (!isReserved) {
                            toReturn.push(table)
                        }
                    }
                });
            }
        }
        if (toReturn.length > 0) {
            res.status(200).json({
                data: toReturn
            })
        } else {
            res.status(404).json({
                message: 'no tables found'
            })
        }

    } catch {
        res.status(500).json({
            message: "server error"
        })
    }
    client.close()
}

