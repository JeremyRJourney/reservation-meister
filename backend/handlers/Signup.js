"use strict"

require("dotenv").config();
const { MONGO_URI } = process.env;

const { response } = require("express");
const { MongoClient } = require("mongodb");
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};


exports.SignUp = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    try {
        await client.connect();
        const db = client.db("project");
        const user = await db.collection("pendingUsers").findOne({ uid: req.params.id });
        if (user) {
            res.status(200).json({
                data: user
            })
            await db.collection("users").insertOne({
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                userType: user.userType,
                isActive: true,
            });
            await db.collection("pendingUsers").deleteOne({ uid: req.params.id });
            } else {
            res.status(404).json({
                message: "user not found"
            })
        }

    } catch {
        res.status(500).json({
            message: "server error"
        })
    }
    client.close()
}

