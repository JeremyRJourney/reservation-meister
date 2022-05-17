"use strict"

require("dotenv").config();
const { MONGO_URI } = process.env;

const { response } = require("express");
const { MongoClient } = require("mongodb");
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};


exports.GetReservationList = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);

    try {
        await client.connect();
        const db = client.db("project");

        const reservations = await db.collection("reservations").find().toArray();
        if (reservations) {
            res.status(200).json({
                data: reservations
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

