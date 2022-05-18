"use strict"

require("dotenv").config();

exports.SignOut = async (req, res) => {
    try {
        // No actual logic being done here,
        // Just passing back the localStorage items to set
        res.status.json({
            isAuthed: false
        })
    
    } catch {
        res.status(500).json({
            message: "server error"
        })
    }
}
