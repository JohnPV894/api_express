const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const middlewares = require('./middlewares');
require('dotenv').config();

const app = express();

// Configuración de CORS
const corsOptions = {
  origin: '*', // Cambiar por la URL de tu frontend en producción
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan('dev'));

// Datos locales en lugar de MongoDB
let estudiantes = [
  { nombre: 'Juan', apellido: 'Perez', telefono: '123456789' },
  { nombre: 'Maria', apellido: 'Lopez', telefono: '987654321' },
  { nombre: 'Carlos', apellido: 'Ramirez', telefono: '456123789' }
];
let port = 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
app.get('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄+ HOLA Eder',
  });
});

// Obtener todos los estudiantes
app.get('/users', (req, res) => {
  res.json({ message: estudiantes });
});

// Buscar estudiantes por nombre
app.get('/users/nombre/:nombre', (req, res) => {
  const nombre = req.params.nombre;
  const resultado = estudiantes.filter(est => est.nombre === nombre);

  if (resultado.length > 0) {
    res.json({ message: resultado });
  } else {
    res.status(404).json({
      message: `No se encontraron estudiantes con el nombre: ${nombre}`,
    });
  }
});

// Buscar estudiantes por apellido
app.get('/users/apellido/:apellido', (req, res) => {
  const apellido = req.params.apellido;
  const resultado = estudiantes.filter(est => est.apellido === apellido);

  if (resultado.length > 0) {
    res.json({ message: resultado });
  } else {
    res.status(404).json({
      message: `No se encontraron estudiantes con el apellido: ${apellido}`,
    });
  }
});

// Buscar estudiantes por teléfono
app.get('/users/telefono/:telefono', (req, res) => {
  const telefono = req.params.telefono;
  const resultado = estudiantes.filter(est => est.telefono === telefono);

  if (resultado.length > 0) {
    res.json({ message: resultado });
  } else {
    res.status(404).json({
      message: `No se encontraron estudiantes con el teléfono: ${telefono}`,
    });
  }
});

// Agregar un nuevo estudiante
app.post('/users/agregar/:nombre/:apellido/:telefono', (req, res) => {
  const { nombre, apellido, telefono } = req.params;
  estudiantes.push({ nombre, apellido, telefono });
  res.status(201).send('Usuario Creado Correctamente');
});

//app.use(middlewares.notFound);
//app.use(middlewares.errorHandler);

module.exports = app;