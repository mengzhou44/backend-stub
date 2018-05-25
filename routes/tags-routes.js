module.exports = (app) => {

    app.get("/tags", (req, res) => {
        var header = req.headers["authorization"] || "";
        res.send(
            [
                ["AAAA00003253", "22900343434"],
                ["AAAA00003255", "27332383312"],
                ["AAAA00003256", "43947394343"],
                ["AAAA00003259", "273323833032"]
            ]);
    });
}