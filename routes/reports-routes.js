var jsreport = require('jsreport-core')();

module.exports = (app) => {

    app.get("/reports/clients", (req, res) => {
        jsreport.init().then(function () {
            return jsreport.render({
                template: {
                    content: '<h1>Hello {{:foo}}</h1>',
                    engine: 'jsrender',
                    recipe: 'phantom-pdf'
                },
                data: {
                    foo: "world"
                }
            }).then(function (resp) {
                res.send(resp.content.toString());
            });
        }).catch(function (e) {
            console.log(e)
        })

    });

}