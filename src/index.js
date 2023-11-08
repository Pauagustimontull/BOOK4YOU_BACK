const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

const router = require('../routes/routes');

// Utiliza el puerto 80.
const port = 80;

app.listen(port, () => {
    console.log(`Live at Port ${port}`);
});

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(router);
