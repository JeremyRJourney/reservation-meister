"use strict"

require("dotenv").config();
const { MONGO_URI } = process.env;

const { response } = require("express");
const { MongoClient } = require("mongodb");
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
  

exports.SignIn = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    try {
        const username = (req.body.username).toLowerCase()
        await client.connect();
        const db = client.db("project");
        const users = await db.collection("users").findOne({ username: username});

        if (users) {
            res.status(200).json({
                data: {
                    isAuthed: true,
                    userType: users.userType
                }
            })
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

