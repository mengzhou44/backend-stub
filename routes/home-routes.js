module.exports = (app) => {


    app.post("/register", (req, res) => {
        console.log(req.body.macAddress);
        res.send({
            token: "DD23FJSSS-09892"
        });
    });

}