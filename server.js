require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();
const { port } = require('./config');

const { postUsers, loginUser } = require('./controllers/users');

// Middleware que analiza json y examina las solicitudes en las que el encabezado Content-Type coincide con la opción de tipo.
app.use(express.json());
app.use(bodyParser.json());

// Rutas de Usuario
app.post('/users', postUsers);
app.post('/users/login', loginUser);

// Middleware para mostrar logs request
app.use(morgan('dev'));

// Middleware de 404
app.use((error, req, res, next) => {
  console.error(error);

  // Si el error tiene el nombre "ValidationError", quiere decir que es un error tirado por Joi, así que le ponemos un statusCode 400
  if (error.name === 'ValidationError') {
    error.statusCode = 400;
  }

  res
    .status(error.statusCode || 500)
    .send({ status: 'error', message: error.message });
});

app.use((req, res) => {
  res.status(404).send({ status: 'error', message: 'Not found' });
});

app.listen(
  port,
  () => `El servidor se está ejecutando en: http://localhost:${port}`
);
