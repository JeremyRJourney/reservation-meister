"use strict"

const sample = require('../data/ReservationList.json')

sample.sort(function (a, b) {
	let dateA = new Date(a.time), dateB = new Date(b.time)
	return dateA - dateB
});

exports.GetReservationList = async (req, res) => {
    res.status(200).json({
        data: sample
    })
}

