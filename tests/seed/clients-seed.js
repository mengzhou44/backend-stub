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


const populateClients = () => {

    db.executeInTransaction(async (client) => {
        await client.query({
            text: "DELETE FROM clients"
        });

        _.map(clients, async (item) => {
            await client.query({
                text: `INSERT INTO clients(name, company) 
                VALUES($1, $2) 
                RETURNING *`,
                values: [item.name, item.company]
            })

        });
    });

};


module.exports = { populateClients };
