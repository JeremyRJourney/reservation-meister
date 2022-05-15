"use strict"

const sample = require('../data/TableCounts.json')

/* ================
   TABLE STATUSES

   Late
   Seated
   Partially Seated
   Main Course
   Desert
   Paid
   Vacated
   None

*/

exports.GetTableOccupancy = async (req, res) => {
    res.status(200).json({
        data: {
            occupied: 421,
            vacant: 40,
            list: sample
        }
    })
}

