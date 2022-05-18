"use strict"

require("dotenv").config();
const { MONGO_URI } = process.env;

const { response } = require("express");
const { MongoClient } = require("mongodb");
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

exports.GetTableOccupancy = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);

    try {
        await client.connect();
        const db = client.db("project");
        const reservations = await db.collection("reservations").find().toArray();
        const tables = await db.collection("tables").find().toArray();
        if (tables && reservations) {
                const toReturnVacant = {}
                const toReturnOccupied = {}
                const today = (new Date()).getDate()

                tables.forEach(element => {
                    let isTableOccupied = false
                    reservations.forEach(reserve => {
                        const reserveDate = new Date(reserve.time)
                        if (today == reserveDate.getDate()) {
        
                            // If the table is reserved add it to reserved list
                            if (reserve.tableName === element.tableName) {
                                isTableOccupied = true
                                if (toReturnOccupied[element.tableType]) {
                                    toReturnOccupied[element.tableType] += 1
                                } else {
                                    toReturnOccupied[element.tableType] = 1
                                }
                            }
                        }
                    });
                    // Else add it to the vacant list
                    if (!isTableOccupied) {
                        if (toReturnVacant[element.tableType]) {
                            toReturnVacant[element.tableType] += 1
                        } else {
                            toReturnVacant[element.tableType] = 1
                        }
                    }
                });

                const vacant = Object.keys(toReturnVacant).map((key) => [Number(key), toReturnVacant[key]]);
                const occupied = Object.keys(toReturnOccupied).map((key) => [Number(key), toReturnOccupied[key]]);
                res.status(200).json({
                    data: {
                        vacant: vacant,
                        occupied: occupied
                    }
                })
        } else {
            res.status(404).json({
                message: "tables not found"
            })
        }
    } catch {
        res.status(500).json({
            message: "server error"
        })
    }
    client.close()
}

