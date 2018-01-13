const _ = require('lodash');
const db = require("../db");

module.exports = (app) => {


    app.get("/clients", (req, res) => {
        var header = req.headers["authorization"] || "";
        db.execute({
            text: "SELECT * FROM clients"
        }).then(result => {
            res.status(200).send(result);
        })
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



};


