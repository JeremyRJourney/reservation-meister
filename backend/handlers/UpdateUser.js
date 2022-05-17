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

exports.UpdateUser = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    try {
        await client.connect();
        const db = client.db("project");
        const firstName = req.body.firstName
        const user = await db.collection("users").updateOne(
            { "_id":  ObjectId(req.params.id)},
            {
                $set: {
                    "firstName": req.body.firstName,
                    "lastName": req.body.lastName,
                    "username": req.body.username,
                    "userType": req.body.userType,
                }
            }
        )
        if (user) {
            res.status(200).json({
                data: {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    username: req.body.username,
                    userType: req.body.userType,
                    isActive: req.body.isActive    
                }
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

