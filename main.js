const express = require("express")
const ejs = require("ejs")
const sqlite3 = require("better-sqlite3")
const fs = require("fs")
const cookie_parser = require("cookie-parser")
const session = require("express-session")
const flash = require("connect-flash")
const { join } = require("path")
//Creating the app and setting a port variable
const app = express()
const port = 1200
//Importing routes
const login_route = require("./routes/login_route")
const register_route = require("./routes/register_route")
const main_page_route = require("./routes/main_page_route")
const logout_route = require("./routes/logout_route")
app.set("views", "./views")
app.set('view engine', 'ejs');
app.use(express.static(join(__dirname, '/public')));
//Setting the app to be able to read data from HTML forms
app.use(express.urlencoded({ extended: true }));
app.use(cookie_parser())
app.use(session({secret: "WK31K3KKJAD32A1SA9"}));
app.use(flash())

app.get("/", (req, res) => {res.send("Hello there !")})
app.use("/login", login_route)
app.use("/register", register_route)
app.use("/home", main_page_route)
app.use("/logout", logout_route)


app.listen(port, () => {
    db_path = join(__dirname, "website_data.db")
    if(fs.existsSync(db_path)) {
        //Going along with the existing db
        console.log("The website will use the existing database.")
    }
    else{
        //Creating a new db if it doesn't exist
        let db = new sqlite3("website_data.db", {verbose : console.log})
        query = "CREATE TABLE IF NOT EXISTS users (name TEXT PRIMARY KEY, email TEXT, password TEXT)"
        db.exec(query)
        const insert_test_user = db.prepare("INSERT INTO users (name, email, password) VALUES (?,?,?)")
        insert_test_user.run("test_user", "test_password", "test@testmail.com")
        db.close()
        console.log("New database has been created (first initialization).")
    }
    //Running the website
    console.log("Website is running...")
})
