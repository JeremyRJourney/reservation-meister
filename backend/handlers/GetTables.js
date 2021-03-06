"use strict"

require("dotenv").config();
const { MONGO_URI } = process.env;

const { response } = require("express");
const { MongoClient } = require("mongodb");
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};


exports.GetTables = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);

    try {
        await client.connect();
        const db = client.db("project");
        if (req.query.section) {
            // Get Tables & Reservations
            const tables = await db.collection("tables").find({ section: req.query.section}).toArray();
            const reservations = await db.collection("reservations").find({ section: req.query.section}).toArray();
            if (tables && reservations) {
                const toReturn = []
                const today = (new Date()).getDate()

                tables.forEach(table => {
                    let isReserveFound = false
                    reservations.forEach(reserve => {
                        const reserveDate = new Date(reserve.time)
                        if (today == reserveDate.getDate()) {
                            if (table.tableName === reserve.tableName) {
                                isReserveFound = true
                                toReturn.push({
                                    ...table,
                                    isOccupied: true
                                })
                            }
                        }
                    });
                    if (!isReserveFound) {
                        toReturn.push({
                            ...table,
                            isOccupied: false
                        })
                    }                
                });
                res.status(200).json({
                    data: toReturn
                })
            } else {
                res.status(404).json({
                    message: "Error, not found"
                })
            }
        } else {
            res.status(400).json({
                message: "Error, no section provided"
            })
        }
    } catch {
        res.status(500).json({
            message: "server error"
        })
    }
    client.close()
}

