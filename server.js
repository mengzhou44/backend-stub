const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db");


const { Pool, Client } = require('pg');


const app = express();

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

require("./routes/clients-routes")(app);
require("./routes/field-data-routes")(app);
require("./routes/home-routes")(app);
require("./routes/tags-routes")(app);
require("./routes/wifi-routes")(app);
require("./routes/reports-routes")(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, error => {
    if (error) throw error;
    console.log("Server running on port: " + PORT);
});

module.exports = { app };

