const express = require("express")
const sqlite3 = require("sqlite3")
const router = express.Router()
const { join } = require("path")
let db_path = join(__dirname, "website_data.db")
db_path = db_path.replace("routes", "")

router.get("/", (req, res) => {
    res.render("login_page")
})
router.post("/", (req, res) => {
    const {username, password} = req.body
    console.log(req.body)
    let db = new sqlite3.Database(db_path)
    query = "SELECT * FROM users WHERE username=?"
    db.get(query, [username], function(err, rows) {
        if(err) {console.log(err.message)}
        const failed_login = true
        if(rows) {
            let username_ok = false
            let password_ok = false
            if(rows.username == username){
                username_ok = true
            }
            if(rows.password == password){
                password_ok = true
            }
            if(username_ok && password_ok) {
                res.send("Logged in !")
            }
            if(password_ok == false) {
                res.render("login_page", {failed_login : failed_login})
            }
        } else {
            res.render("login_page", {failed_login : failed_login})
        }
    })
})

module.exports = router