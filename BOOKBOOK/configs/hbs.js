const exphbs = require("express-handlebars")

module.exports = function(app) {
    app.engine('hbs', exphbs.engine({
        extname: 'hbs',
        defaultLayout: 'default.hbs',
    }))
    app.set('view engine', 'hbs')
}