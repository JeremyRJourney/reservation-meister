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

        // TODO, find where date is today
        const reservations = await db.collection("reservations").find().toArray();
        if (reservations) {
            let toReturn = []
            let statusReturn = []
            const today = (new Date()).getDate()
            reservations.forEach(reserve => {
                const reserveDate = new Date(reserve.time)
                if (today == reserveDate.getDate()) {
                    toReturn.push(reserve)
                }
            });
            res.status(200).json({
                data: toReturn
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

