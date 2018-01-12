const expect = require("expect");
const request = require("supertest");


const { app } = require('../server');

const { populateClients } = require("./seed/clients-seed");

beforeEach(populateClients);

describe("GET /clients", () => {
    it("should able to get clients", (done) => {
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
