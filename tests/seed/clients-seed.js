const _ = require("lodash");
const db = require("../../db");

const clients = [
    {
        name: "Mark",
        company: "Cenovous"
    },
    {
        name: "Denis",
        company: "Nexen"
    }
];


const populateClients = (done) => {
    db.executeInTransaction(async (client) => {
        await client.query({
            text: "DELETE FROM clients"
        });

        _.map(clients, async (item) => {
            const res = await client.query({
                text: `INSERT INTO clients(name, company) 
                VALUES($1, $2) 
                RETURNING *`,
                values: [item.name, item.company]
            });
            item.id = res.rows[0].id;
        });
    }).then(() => {
        done();
    })
};


module.exports = { populateClients, clients };
