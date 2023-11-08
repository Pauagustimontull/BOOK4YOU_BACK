const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

const router = require('../routes/routes');

// Utiliza el puerto proporcionado por Netlify o, si no se proporciona, utiliza el puerto 2020.
const port = process.env.PORT || 2020;

app.listen(port, () => {
    console.log(`Live at Port ${port}`);
});

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());


app.use(router);
