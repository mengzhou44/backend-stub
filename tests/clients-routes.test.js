const expect = require("expect");
const request = require("supertest");
const db = require("../db");


const { app } = require('../server');

const { populateClients, clients } = require("./seed/clients-seed");

beforeEach(populateClients);

describe("GET /clients", () => {
    it("should be able to get clients", (done) => {
        request(app)
            .get("/clients")
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                expect(res.body.length).toBe(2);
                done();
            });
    })
});


describe("POST /clients/add", () => {
    it("should be able to add client", (done) => {
        request(app)
            .post("/clients/add")
            .send({ name: "Simon", company: "345454 alberta ltd." })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                db.execute({
                    text: "SELECT * from clients where name=$1",
                    values: ["Simon"]

                }).then((result) => {
                    expect(result.length).toBe(1);
                    done();
                }).catch(err => {
                    done(err);
                })
            });
    })
});

describe("POST /clients/update", () => {

    const client = clients[0];
    console.log("clients", client);
    client.name = "new name";

    it("should be able to update client", (done) => {
        request(app)
            .post("/clients/update")
            .send(client)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                db.execute({
                    text: "SELECT * from clients where id=$1",
                    values: [client.id]

                }).then((result) => {
                    expect(result[0].name).toBe("new name");
                    done();
                }).catch(err => {
                    done(err);
                })
            });
    })
});

describe("POST /clients/remove", () => {
    it("should be able to remove client", (done) => {
        request(app)
            .post("/clients/remove")
            .send({ id: clients[0].id })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                db.execute({
                    text: "SELECT * from clients"
                }).then((result) => {

                    expect(result.length).toBe(1);
                    done();
                }).catch(err => {
                    done(err);
                })
            });
    })
});

