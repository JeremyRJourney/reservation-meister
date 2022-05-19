"use strict"

require("dotenv").config();
const { MONGO_URI } = process.env;

const { response } = require("express");
const { MongoClient } = require("mongodb");
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const GetReservationAndTable = (reservations, tables) => {
    const toReturn = []
    const today = (new Date()).getDate()

    tables.forEach(table => {
        let isReserved = false
        reservations.forEach(reserve => {
            const reserveDate = new Date(reserve.time)
            if (today == reserveDate.getDate()) {
                if (table.tableName == reserve.tableName) {
                    isReserved = true

                    // Check if late and if so overwrite return
                    let status = null

                    const currentDate = new Date()
                    const reserveDate = new Date(reserve.time)
                    if (Date.parse(currentDate) > Date.parse(reserveDate) && reserve.status === 'none')
                        status = 'late'
                    else
                        status = reserve.status

                    // Format return
                    toReturn.push({
                        _id: reserve._id,
                        tableName: reserve.tableName,
                        firstName: reserve.firstName,
                        lastName: reserve.lastName,
                        guests: reserve.guests,
                        time: reserve.time,
                        notes: reserve.notes,
                        status: status,
                        tableLocationX: table.tableLocationX,
                        tableType: table.tableType,
                        tableLocationY: table.tableLocationY
                    })
                }
            }
        })
        if (!isReserved) {
            toReturn.push({
                _id: table._id,
                tableName: table.tableName,
                tableLocationX: table.tableLocationX,
                tableType: table.tableType,
                tableLocationY: table.tableLocationY
            })
        }
    });


    return toReturn
}

exports.GetReservationTables = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);

    try {
        await client.connect();
        const db = client.db("project");
        if (req.query.section) {
            const reservations = await db.collection("reservations").find().toArray();
            const tables = await db.collection("tables").find({ section: req.query.section}).toArray();

            if (reservations && tables) {
                res.status(200).json({
                    data: GetReservationAndTable(reservations, tables)
                })
            } else {
                res.status(404).json({
                    message: "Error, not found"
                })
            }
        } else {
            const reservations = await db.collection("reservations").find().toArray();
            const tables = await db.collection("tables").find().toArray();
            if (reservations && tables) {
                res.status(200).json({
                    data: GetReservationAndTable(reservations, tables)
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

