module.exports = (app) => {

    app.get("/wifi", (req, res) => {
        var header = req.headers["authorization"] || "";
        res.send(
            [
                {
                    ssid: 'smartmat-wifi-5',
                    password: 'smartmat',
                    readerType: 'speedway'
                },
                {
                    ssid: 'TELUS6335',
                    password: 'bbtkfgfyb6'
                },
            ]);
    });
}