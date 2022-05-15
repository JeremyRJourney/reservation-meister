"use strict"

require("dotenv").config();
const { MONGO_URI } = process.env;

const { response } = require("express");
const { MongoClient } = require("mongodb");
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};


exports.GetTables = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);

    try {
        await client.connect();
        const db = client.db("project");
        console.log(req.query.section)
        if (req.query.section) {
            const tables = await db.collection("tables").find({ section: req.query.section}).toArray();
            if (tables) {
                res.status(200).json({
                    data: tables
                })
            } else {
                res.status(404).json({
                    message: "tables not found"
                })
            }
        } else {
            const tables = await db.collection("tables").find().toArray();
            if (tables) {
                res.status(200).json({
                    data: tables
                })
            } else {
                res.status(404).json({
                    message: "tables not found"
                })
            }

        }
    } catch {
        res.status(500).json({
            message: "server error"
        })
    }
    client.close()
}

