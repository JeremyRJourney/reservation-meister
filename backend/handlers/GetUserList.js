"use strict"

require("dotenv").config();
const { MONGO_URI } = process.env;

const { response } = require("express");
const { MongoClient } = require("mongodb");
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};


exports.GetUserList = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);

    try {
        await client.connect();
        const db = client.db("project");

        const users = await db.collection("users").find().toArray();
        if (users) {
            res.status(200).json({
                data: users
            })
        } else {
            res.status(404).json({
                message: "users not found"
            })

        }
    } catch {
        res.status(500).json({
            message: "server error"
        })
    }
    client.close()
}

