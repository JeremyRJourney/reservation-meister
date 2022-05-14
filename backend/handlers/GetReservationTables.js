"use strict"

let sample = require('../data/ReservationTables.json')


exports.GetReservationTables = async (req, res) => {

    if (req.query.sectionName) {
        const filteredTables = sample.filter(function(item) {
            return (item.section).toLowerCase() == (req.query.sectionName).toLowerCase()
        })
        res.status(200).json({
            data: filteredTables
        })
    
    } else {
        res.status(200).json({
            data: sample
        })
    }
}

