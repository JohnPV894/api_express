const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const middlewares = require('./middlewares');
const app = express();

// Configuración de CORS
const corsOptions = {
  origin: 'https://practicaapi.vercel.app/', // Cambiar por la URL de tu frontend en producción
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
};

app.use(cors(corsOptions));
app.use(express.json());

// URI de conexión con MongoDB
const uri = 'mongodb+srv://santiago894:P5wIGtXue8HvPvli@cluster0.6xkz1.mongodb.net/';
const cliente = new MongoClient(uri);

// Conexión persistente a MongoDB
let dbClient;
let db;//Nombre de la base de datos : express
//Nombre de la collecion que se esta utilizando : estudiantes

// Conectar a MongoDB al inicio
async function connectToMongoDB() {
  try {
    dbClient = await cliente.connect();
    db = dbClient.db('express');  // Selecciona la base de datos
    console.log('Conexión exitosa a MongoDB');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
    throw error;
  }
}

// Función para obtener todos los estudiantes
async function buscarEstudiantes() {
  if (!db) {
    throw new Error('Base de datos no disponible');
  }
  try {
    const collection = db.collection('estudiantes');
    return await collection.find().toArray();
  } catch (error) {
    console.error('Error al buscar estudiantes:', error);
    throw error;
  }
}

// Función para obtener estudiantes por nombre
async function buscarEstudiantesPorNombre(nombre) {
  if (!db) {
    throw new Error('Base de datos no disponible');
  }
  try {
    const collection = db.collection('estudiantes');
    return await collection.find({ nombre }).toArray();
  } catch (error) {
    console.error('Error al buscar estudiantes por nombre:', error);
    throw error;
  }
}

// Función para agregar un estudiante
async function subirEstudiante(estudiante) {
  if (!db) {
    throw new Error('Base de datos no disponible');
  }
  try {
    const collection = db.collection('estudiantes');
    await collection.insertOne(estudiante);
  } catch (error) {
    console.error('Error al subir estudiante:', error);
    throw error;
  }
}

app.get('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄+ HOLA Eder',
  });
});

// Obtener todos los estudiantes
app.get('/users', async (req, res) => {
  try {
    const estudiantes = await buscarEstudiantes();
    res.json({ message: estudiantes });
  } catch (error) {
    res.status(500).json({
      error: 'Error al obtener estudiantes',
      details: error.message,
    });
  }
});

// Buscar estudiantes por nombre
app.get('/users/:nombre', async (req, res) => {
  const nombre = req.params.nombre;

  try {
    const estudiantes = await buscarEstudiantesPorNombre(nombre);
    if (estudiantes.length > 0) {
      res.json({ message: estudiantes });
    } else {
      res.status(404).json({
        message: `No se encontraron estudiantes con el nombre: ${nombre}`,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error al buscar los estudiantes',
      details: error.message,
    });
  }
});

// Agregar un nuevo estudiante
app.post('/users/agregar/:nombre/:apellido/:telefono', async (req, res) => {
  const { nombre, apellido, telefono } = req.params;

  try {
    await subirEstudiante({
      nombre,
      apellido,
      telefono,
    });
    res.status(201).send('Usuario Creado Correctamente');
  } catch (error) {
    res.status(500).json({
      error: 'Error al agregar el estudiante',
      details: error.message,
    });
  }
});

// Conectar a MongoDB antes de escuchar las rutas
connectToMongoDB().catch((error) => {
  console.error('Error al conectar con la base de datos:', error);
  process.exit(1); // Termina la ejecución si no se puede conectar a MongoDB
});

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;