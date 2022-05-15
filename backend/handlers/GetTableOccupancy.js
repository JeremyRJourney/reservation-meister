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
        const tables = await db.collection("tables").find().toArray();
        if (tables) {
            const toReturnVacant = {}
            const toReturnOccupied = {}

            tables.forEach(element => {
                if (toReturnVacant[element.tableType]) {
                    if (!element.isOccupied)
                        toReturnVacant[element.tableType] += 1
                    else
                        toReturnOccupied[element.tableType] += 1
                }
                else {
                    if (!element.isOccupied)
                        toReturnVacant[element.tableType] = 1
                    else
                        toReturnOccupied[element.tableType] = 1
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

