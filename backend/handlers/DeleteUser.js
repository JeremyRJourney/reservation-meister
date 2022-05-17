"use strict"

require("dotenv").config();
const { MONGO_URI } = process.env;

const { response } = require("express");
const { MongoClient } = require("mongodb");
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};


exports.DeleteUser = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    try {
        await client.connect();
        const db = client.db("project");
        const user = await db.collection("users").deleteOne({_id: req.params._id});
        if (user) {
            res.status(201)
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

