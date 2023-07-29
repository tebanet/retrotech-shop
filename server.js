require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();
const { port } = require('./config');

// Middleware que analiza json y examina las solicitudes en las que el encabezado Content-Type coincide con la opción de tipo.
app.use(bodyParser.json());

// Middleware para mostrar logs request
app.use(morgan('dev'));

app.listen(
  port,
  () => `El servidor se está ejecutando en: http://localhost:${port}`
);
