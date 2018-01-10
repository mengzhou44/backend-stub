const { Pool } = require('pg');
const _ = require("lodash");

const pool = new Pool({
    user: "postgres",
    database: "gems_smartmats_qa",
    server: "localhost",
    password: "Aa1197344",
    port: 5432
});

async function execute(query) {
    const client = await pool.connect();
    try {
        const res = await client.query(query);
        return res.rows;

    } catch (error) {
        throw error;
    }
    finally {
        client.release();
    }
}

module.exports = { execute }  