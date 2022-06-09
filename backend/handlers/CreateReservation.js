"use strict"

require("dotenv").config();

const { MONGO_URI } = process.env;

const { MongoClient } = require("mongodb");
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};


exports.CreateReservation = async (req, res) => {

    const client = new MongoClient(MONGO_URI, options);
    console.log(req)
    try {
        const todaysDate = new Date()
        
        let month = (todaysDate.getMonth())+1
        if (month.toString().length === 1) {
            month = `0${month}`;
        }
        let day = (todaysDate.getDate())
        if (day.toString().length === 1) {
            day = `0${day}`;
        }

        const formattedDate = todaysDate.getFullYear() + "-" + month + "-" + day
        await client.connect();
        const db = client.db("project");
        const reservations = await db.collection("reservations").insertOne({
            tableName: req.body.tableName,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            guests: req.body.guests,
            time: formattedDate+"T"+req.body.time+":00",
            status: 'none',
            notes: req.body.notes
        });
        if (reservations) {
            res.status(201).json({
                message: 'created'
            })
        } else {
            res.status(404).json({
                message: "reservations not created"
            })
        }
    } catch {
        res.status(500).json({
            message: "server error"
        })
    }
    client.close()
}

