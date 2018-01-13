module.exports = (app) => {


    app.post("/field-data", (req, res) => {
        var header = req.headers["authorization"] || "";
        console.log("field-data header:", header);
        console.log(JSON.stringify(req.body, null, 4));
        res.send({
            success: true
        });
    });


}