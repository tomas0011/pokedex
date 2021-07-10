const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes');

const app = express();
const port = process.env.PORT || 3002;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use('/', routes);

app.listen(port, () => {
    console.info(`_________________________________________________`);
    console.info(`||--> el servidor esta corriendo en el ${port} <--||`);
    console.info(`TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT`);
});

module.exports = {
    app
}