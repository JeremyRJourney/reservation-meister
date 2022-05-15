"use strict"

let sample = require('../data/UserList.json')


exports.GetUserList = async (req, res) => {

    res.status(200).json({
        data: sample
    })
}

