"use strict"

const sample = require('../data/TableCounts.json')


exports.GetTableOccupancy = async (req, res) => {
    res.status(200).json({
        data: {
            occupied: 421,
            vacant: 40,
            list: sample
        }
    })
}

