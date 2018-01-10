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

app.get("/", (req, res) => {
    res.send("Hell, World!");
});

app.get("/tags", (req, res) => {
    res.send(
        [
            ["AAAA00003253", "22900343434"],
            ["AAAA00003255", "27332383312"],
            ["AAAA00003256", "43947394343"],
            ["AAAA00003259", "273323833032"]
        ]);
});



app.post("/field-data", (req, res) => {
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
            "clientid": 343444,
            "clientname": "Cenovous",
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
            "clientid": 343448,
            "clientname": "Nexus",
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
            "clientid": 343449,
            "clientname": "Suncor",
            "jobs": [
                {
                    "id": 76650,
                    "name": "GEMS-2017 Q224ES"
                }
            ]
        }];

    res.send(clients);
})

app.post("/clients", (req, res) => {
    const { id } = req.body;
    const query = {
        text: "SELECT * FROM clients  WHERE id = $1",
        values: [id]
    };
    db.execute(query).then((result) => {
        res.status(200).send(result);
    }).catch(err => {
        console.log(err);
        res.status(400).send(err);
        return;
    })
});


app.post("/clients/add", (req, res) => {
    const { name, company } = req.body;
    const query = {
        text: `INSERT INTO clients(name, company) 
        VALUES($1, $2) 
        RETURNING *`,
        values: [name, company]
    };

    db.execute(query).then((result) => {
        res.status(200).send({ success: true });
    }).catch(err => {
        console.log(err);
        res.status(400).send(err);
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

    db.execute(query).then((result) => {
        res.status(200).send({ success: true });
    }).catch(err => {
        console.log("Not able to edit client.");
        res.status(400).send(err);
    })
});

app.post("/clients/remove", (req, res) => {
    const { id } = req.body;
    const query = {
        text: `DELETE FROM clients
                   WHERE id = $1
                   RETURNING *`,
        values: [id]
    };

    db.execute(query).then((result) => {
        res.status(200).send({ success: true });
    }).catch(err => {
        res.status(400).send("Not able to delete client.");
    })
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, error => {
    if (error) throw error;
    console.log("Server running on port: " + PORT);
});

