const express = require("express");
const cors = require("cors");

const app = express();

var corsOption = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOption));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Basic Node-Express-Mongo App" });
});

const db = require("./app/models");
db.mongoose.connect(db.url, {
    // useNewUrlParse: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to the database");
}).catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
});

require("./app/routes/student.routes")(app);
require("./app/routes/class.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running at port: ${PORT}.`);
});