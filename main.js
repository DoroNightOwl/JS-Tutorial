const express = require("express")
const ejs = require("ejs")
const sqlite3 = require("sqlite3").verbose()
const fs = require("fs")
const { join } = require("path")
//Creating the app and setting a port variable
const app = express()
const port = 1200
//Importing routes
const login_route = require("./routes/login_route")
app.set("views", "./views")
app.set('view engine', 'ejs');
app.use(express.static(join(__dirname, '/public')));
//Setting the app to be able to read data from HTML forms
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {res.send("Hello there !")})
app.use("/login", login_route)


    db_path = join(__dirname, "website_data.db")
    if(fs.existsSync(db_path)) {
        //Going along with the existing db
        console.log("The website will use the existing database.")
    }
    else{
        //Creating a new db if it doesn't exist
        let db = new sqlite3.Database(db_path)
        query = "CREATE TABLE IF NOT EXISTS users (username TEXT, password TEXT)"
        db.run(query)
        console.log("Database doesn't exist.")
        console.log("A new database was initialized.")
        db.close()
        //Inserting a test user into the db
        db = new sqlite3.Database(db_path)
        query = "INSERT INTO users (username, password) VALUES (?,?)"
        db.run(query, ["test_user", "test_password"])
        console.log("Test user has been inserted into the database.")
    }
    //Running the website
    console.log("Website is running...")
    
})
