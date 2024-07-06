const express = require("express")
const session = require("express-sesssion")
const sqlite3 = require("better-sqlite3")
const router = express.Router()
const { join } = require("path")
const fs = require("fs")

var project_path = __dirname
project_path = project_path.replace("routes", "")
var db_path = join(project_path, "website_data.db")
var views_path = join(project_path, "views")
var page_content = fs.readFileSync(join(views_path, "error_page.ejs"), "utf-8")
router.get("/", (req, res) => {
    if (req.session.connected) { 
        response = "You can't register, you are already connected with an account !"
        page_content = page_content.replace("!ERROR!", response)
        res.render("base.ejs", {page_content : page_content})
    } else {
        res.render("register_page")
    }
    return 0
})
router.post("/", (req, res) => {
    const {username, password, confirm_password, email} = req.body
    let db = sqlite3(db_path, {verbose : console.log})
    const verify_user_exists = db.prepare("SELECT * FROM users WHERE name=?")
    const get_user = verify_user_exists.get(username)
    if(get_user) {
        const response = "Username already exists in our database !"
        res.render("register_page", {register_response : response})
        return 0
    }
    const verify_email_exists = db.prepare("SELECT * FROM users WHERE email=?")
    const get_email = verify_email_exists.get(email)
    if(get_email) {
        const response = "Email is already in use !"
        res.render("register_page", {register_response : response})
        return 0
    }
    const insert_new_user = db.prepare("INSERT INTO users (name, password, email) VALUES (?,?,?)")
    insert_new_user.run(username, email, password)
    db.close()
    const response = "Account created succesfully !"
    res.render("register_page", {register_response : response, registration_ok : true})


})

module.exports = router