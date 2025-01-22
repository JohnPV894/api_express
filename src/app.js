const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { MongoClient } = require('mongodb');

require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api');
const app = express();


const corsOptions = {
  origin: 'https://practicaapi.vercel.app/', // Reemplaza con la URL de tu frontend en producción
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
};

app.use(cors(corsOptions));
const uri ="mongodb+srv://santiago894:P5wIGtXue8HvPvli@cluster0.6xkz1.mongodb.net/";
const cliente = new MongoClient(uri);


async function connectToMongoDB(uri) {
  if (!uri) {
    throw new Error('Debe proporcionar un URI ');
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Conexión exitosa a MongoDB');
    return client;
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
    throw error;
  }
}

(async () => {
  // URI actualizado
  const uri = 'mongodb+srv://santiago894:P5wIGtXue8HvPvli@cluster0.6xkz1.mongodb.net/miBaseDeDatos?retryWrites=true&w=majority';
  let client;

  try {
    client = await connectToMongoDB(uri);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    if (client) {
      await client.close();
      console.log('Conexión cerrada.');
    }
  }
})();


async function subirEstudiante(client,dbName,estudiante) {
  try {
    // Conectar al cliente
    await client.connect();
    console.log('Conectado a MongoDB');

    // Seleccionar la base de datos y colección
    const db = client.db(dbName);
    const collection = db.collection('estudiantes');

    // Subir los datos
    const resultado = await collection.insertOne(estudiante);
    console.log("Deberia estar correcto");
    
  } catch (error) {
    console.error('Error al subir estudiante:', error);
  } finally {

    await client.close();
  }
}

//Mostrar/Recuperar todos los estudiantes en la coleccion
async function buscarEstudiantes(client) {
  try {
    // Conectar al cliente
    await client.connect();
    console.log('Conectado a MongoDB');

    // entrar a la base de datos y colección
    let db = client.db('express');
    let colección = db.collection('estudiantes');

    // convertir los resultados a un array
    let estudiantes = await colección.find().toArray();
    return estudiantes;

  } catch (error) {
    console.error('Error al buscar estudiante:', error);
  } finally {
    await client.close();
  }
}

async function buscarEstudiantesPorNombre(client, nombre) {
  try {
    // Conectar al cliente
    await client.connect();
    console.log('Conectado a MongoDB');

    // Acceder a la base de datos y colección
    const db = client.db('express');
    const colección = db.collection('estudiantes');

    // Buscar estudiantes por nombre
    const estudiantes = await colección.find({ nombre: nombre }).toArray();

    return estudiantes;
  } catch (error) {
    console.error('Error al buscar estudiantes por nombre:', error);
  } finally {
    await client.close();
  }
}

app.use(express.json());


app.get('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
  });
});



//Devolver todos los usuarios
app.get('/users', async (req, res) => {
  try {
    const estudiantes = await buscarEstudiantes(cliente);
    res.json({
      message: estudiantes,
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error al obtener estudiantes',
      details: error.message,
    });
  }
});

// buscar un estudiante por su nombre
app.get('/users/:nombre', async (req, res) => {
  const nombre = req.params.nombre; // Obtener el nombre desde los parámetros de la URL

  try {
    const estudiantes = await buscarEstudiantesPorNombre(cliente, nombre);

    if (estudiantes.length > 0) {
      res.json({
        message: estudiantes
      });
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

//Agregar un nuevo usuario a el array "estudiantes"
app.post('/users/agregar/:nombre/:apellido/:telefono',(req,res) =>{
  
  let nombre = req.params.nombre;
  let apellido = req.params.apellido;
  let telefono = req.params.telefono;

  subirEstudiante(cliente,"express",{
          nombre:  nombre,
          apellido:apellido,
          telefono:telefono,
  });

  res.status(201).send("Usuario Creado Correctamente");
  }
)
app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
