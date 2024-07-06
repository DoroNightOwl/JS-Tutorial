const express = require("express")
const sqlite3 = require("better-sqlite3")
const router = express.Router()
const { join } = require("path")
const session = require("express-session")
const fs = require("fs")
let project_path = __dirname
project_path = project_path.replace("routes", "")
const db_path = join(project_path, "website_data.db")
const views_path = join(project_path, "views")
var page_content = fs.readFileSync(join(views_path, "error_page.ejs"), "utf-8")

router.get("/", (req, res) => {
    const response = req.flash()
    console.log("This is : ", response)
    if(req.session.connected) {
        const response = "You are already logged in !"
        page_content = page_content.replace("!ERROR!", response)
        res.render("base", {page_content : page_content})
    } else {
        if(response.success) {
            res.render("login_page", {login_response : response.success})
        } else {
            res.render("login_page")
        }
    }
})
router.post("/", (req, res) => {
    const {username, password} = req.body
    console.log(req.body)
    let db = new sqlite3(db_path, {verbose : console.log})
    const query = db.prepare("SELECT * FROM users WHERE name=?")
    existing_user = query.get(username)
    console.log(existing_user)
    if(existing_user){
        if (existing_user["password"] == password){
            req.session.connected = true
            res.redirect("/home")
        }
        else {
            res.render("login_page", {login_response : "Wrong password !"})
        }
    }
    else {
        res.render("login_page", {login_response : "User does not exist !"})
    }
})

module.exports = router