const express = require("express");
const bodyParser = require('body-parser');

const PORT_NUMBER = 3000;

const app = express();

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

app.get("/", (req, res) => {
    res.send("Hell, World!");
})

app.post("/scans", (req, res) => {
    console.log(JSON.stringify(req.body, null, 4));
    res.send({
        success: true
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
                    "name": "GEMS-2017 4544232"
                },
                {
                    "id": 76653,
                    "name": "GEMS-2017 4544239"
                }
            ]
        },
        {
            "clientId": 343448,
            "clientName": "Nexus",
            "jobs": [
                {
                    "id": 76651,
                    "name": "GEMS-2017 33er241"
                },
                {
                    "id": 76659,
                    "name": "GEMS-2017 WER2333"
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

app.listen(PORT_NUMBER, () => {
    console.log(`Server is running on port ${PORT_NUMBER}`);
})
