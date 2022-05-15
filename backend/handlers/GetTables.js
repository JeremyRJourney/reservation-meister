"use strict"

const sample = require('../data/Tables.json')

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

exports.GetTables = async (req, res) => {
    res.status(200).json({
        data: sample
    })
}

