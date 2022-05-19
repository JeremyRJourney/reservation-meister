"use strict"

require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const uid = uuidv4();

const { MONGO_URI } = process.env;

const { MongoClient } = require("mongodb");
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};


exports.CreateUser = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    try {
        await client.connect();
        const db = client.db("project");
        const user = await db.collection("pendingUsers").insertOne({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            userType: req.body.userType,
            isActive: false,
            uid: uid
        });
        if (user) {
            res.status(201).json({
                data: {
                    uid: uid
                }
            })
        } else {
            res.status(404).json({
                message: "reservations not found"
            })
        }

    } catch {
        res.status(500).json({
            data: req.body,
            message: "server error"
        })
    }
    client.close()
}

