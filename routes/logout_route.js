const express = require("express")
const sqlite3 = require("better-sqlite3")
const router = express.Router()
const session = require("express-session")
const flash = require("connect-flash")
router.get("/", (req, res) => {
    if(req.session.connected) {
        delete req.session.connected
        req.flash("success", "You have logged out !")
        res.redirect("/login")
    } else {
        res.redirect("/login")
    }
})
module.exports = router