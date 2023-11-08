const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

const router = require('../routes/routes');

app.listen('port', 2020);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors()); // Añadido para habilitar CORS

app.use(router);

app.listen(app.get('port'), () => {
    console.log("Live at Port 2020");
});
//ols