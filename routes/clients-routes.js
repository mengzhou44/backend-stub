const _ = require('lodash');
const db = require("../db");

module.exports = (app) => {

    app.get("/clients", (req, res) => {
        res.send(
            [
                {
                    jobs: [
                        {
                            id: 111,
                            name: 'job 111'
                        },
                        {
                            id: 112,
                            name: 'job 112'
                        },
                        {
                            id: 113,
                            name: 'job 113'
                        },
                        {
                            id: 114,
                            name: 'job 114'
                        },
                        {
                            id: 115,
                            name: 'job 115'
                        },
                        {
                            id: 116,
                            name: 'job 116'
                        },
                        {
                            id: 117,
                            name: 'job 111'
                        },
                        {
                            id: 118,
                            name: 'job 112'
                        },
                        {
                            id: 119,
                            name: 'job 113'
                        },
                        {
                            id: 120,
                            name: 'job 114'
                        },
                        {
                            id: 121,
                            name: 'job 115'
                        },
                        {
                            id: 122,
                            name: 'job 116'
                        },
                        {
                            id: 123,
                            name: 'job 123'
                        },
                        {
                            id: 124,
                            name: 'job 124'
                        },
                        {
                            id: 125,
                            name: 'job 125'
                        },
                        {
                            id: 126,
                            name: 'job 126'
                        }

                    ],
                    clientName: 'Daniel Zhou',
                    clientId: 105
                },
                {
                    jobs: [
                        {
                            id: 109,
                            name: 'Edson YWP Yard'
                        }
                    ],
                    clientName: 'GEMS',
                    clientId: 103
                }
            ]
        );
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


