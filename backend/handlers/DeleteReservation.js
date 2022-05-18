"use strict"

const { ObjectId } = require("bson")

require("dotenv").config();
const { MONGO_URI } = process.env;

const { response } = require("express");
const { MongoClient } = require("mongodb");
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};


exports.DeleteReservation = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    try {
        await client.connect();
        const db = client.db("project");
        const user = await db.collection("reservations").deleteOne({_id: ObjectId(req.params.id)});
        if (user.deletedCount === 1) {
            res.status(200).json({
                message: 'reservation deleted'
            })
        } else {
            res.status(404).json({
                message: "reservation not found"
            })
        }

    } catch {
        res.status(500).json({
            message: "server error"
        })
    }
    client.close()
}

