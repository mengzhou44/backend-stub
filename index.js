const express = require("express");
const bodyParser = require("body-parser");

const { Client } = require('pg');


const app = express();

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

app.get("/", (req, res) => {
    res.send("Hell, World!");
});


app.get("/tags", (req, res) => {
    res.send(
        {
            "AAAA00003253": "22900343434",
            "AAAA00003255": "27332383312",
            "AAAA00003256": "43947394343",
            "AAAA00003259": "273323833032",
        });
});



app.post("/scans", (req, res) => {
    console.log(JSON.stringify(req.body, null, 4));
    res.send({
        success: true
    });
});


app.post("/register", (req, res) => {
    console.log(req.body.macAddress);
    res.send({
        token: "DD23FJSSS-09892"
    });
});

app.get("/clients", (req, res) => {
    const clients = [
        {
            "clientId": 343444,
            "clientName": "Cenovous",
            "jobs": [
                {
                    "id": 76652,
                    "name": "18-001-06-0102"
                },
                {
                    "id": 76653,
                    "name": "18-002-03-0105"
                }
            ]
        },
        {
            "clientId": 343448,
            "clientName": "Nexus",
            "jobs": [
                {
                    "id": 76651,
                    "name": "18-003-02-0105"
                },
                {
                    "id": 76659,
                    "name": "18-004-01-0109"
                }
            ]
        },
        {
            "clientId": 343449,
            "clientName": "Suncor",
            "jobs": [
                {
                    "id": 76650,
                    "name": "GEMS-2017 Q224ES"
                }
            ]
        }];

    res.send(clients);
})


const pgClient = new Client({
    user: "postgres",
    database: "gems_smartmats_qa",
    server: "localhost",
    password: "Aa1197344",
    port: 5432
});


app.get("/clients1", (req, res) => {
    pgClient.connect();

    pgClient.query("SELECT * FROM  clients", (err, result) => {
        if (err) {
            console.log("not able to get connection " + err);
            res.status(400).send(err);
        }
        const collection = result.rows;
        res.status(200).send(collection);
        pgClient.end();
    });
});

app.post("/clients", (req, res) => {

    const { name, company } = req.body;
    const query = {
        text: `INSERT INTO clients(id, name, company) 
        VALUES(nextval('clients_id_seq'),$1, $2) 
        RETURNING *`,
        values: [name, company]
    };

    pgClient.connect();
    pgClient.query(query, (err, result) => {
        if (err) {
            console.log("Not able to insert client.");
            res.status(400).send(err);
            return;
        }
        res.status(200).send({ success: true });
        pgClient.end();
    })
});


app.post("/clients/update", (req, res) => {

    const { id, name, company } = req.body;
    const query = {
        text: `UPDATE clients
                   SET name =$2,
                       company = $3
                   WHERE id = $1
                   RETURNING *`,
        values: [id, name, company]
    };

    pgClient.connect();
    pgClient.query(query, (err, result) => {
        if (err) {
            console.log("Not able to edit client.");
            res.status(400).send(err);
            return;
        }
        res.status(200).send({ success: true });
        pgClient.end();
    })
})


const PORT = process.env.PORT || 5000;

app.listen(PORT, error => {
    if (error) throw error;
    console.log("Server running on port: " + PORT);
});

