const express = require("express")
const sqlite3 = require("better-sqlite3")
const router = express.Router()
const { join } = require("path")
const session = require("express-session")
const fs = require("fs")
var main_path = __dirname
main_path = main_path.replace("routes", "")
views_path = join(main_path, "views")
router.get("/", (req, res) => {
    if(req.session.connected) {
        res.render("base", {page_content : fs.readFileSync(join(views_path, "main_page.ejs"), "utf-8")})
    } else {
        res.send("You are not logged in !!!")
    }
})


module.exports = router