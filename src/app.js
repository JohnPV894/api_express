const express = require('express');
const morgan = require('morgan');

require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api');
const app = express();

const { MongoClient } = require('mongodb');


async function connectToMongoDB(uri) {
  if (!uri) {
    throw new Error('Debe proporcionar un URI válido para conectarse a MongoDB.');
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

    const db = client.db('miBaseDeDatos');
    const databases = await db.admin().listDatabases();
    console.log('Bases de datos disponibles:', databases);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    if (client) {
      await client.close();
      console.log('Conexión cerrada.');
    }
  }
})();





app.use(express.json());
let estudiantes = [
  {
      id: 1,
      nombre: "Carlos",
      apellido: "Pérez",
      telefono: "123-456-7890",
  },
  {
      id: 2,
      nombre: "María",
      apellido: "López",
      telefono: "987-654-3210",
  },
  {
      id: 3,
      nombre: "Ana",
      apellido: "Martínez",
      telefono: "456-789-1234",
  },
  {
      id: 4,
      nombre: "Juan",
      apellido: "Gómez",
      telefono: "321-654-9870",
  },
  {
      id: 5,
      nombre: "Lucía",
      apellido: "Hernández",
      telefono: "654-123-7890",
  },
  {
      id: 6,
      nombre: "Pedro",
      apellido: "Ramírez",
      telefono: "789-456-1230",
  },
  {
      id: 7,
      nombre: "Laura",
      apellido: "Morales",
      telefono: "111-222-3333",
  },
  {
      id: 8,
      nombre: "Sofía",
      apellido: "Ortega",
      telefono: "444-555-6666",
  },
  {
      id: 9,
      nombre: "Diego",
      apellido: "Castillo",
      telefono: "777-888-9999",
  },
  {
      id: 10,
      nombre: "Isabel",
      apellido: "Vega",
      telefono: "000-111-2222",
  },
];

app.get('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
  });
});



//Devolver todos los usuarios
app.get(`/users`,(req,res)=>
  res.json({
    message:estudiantes
  })
)
//Recibe una Id y devuelve al Usuario con esa ID
app.get('/users/user:id', (req,res)=>{

    let id_usuario = parseInt(req.params.id);
    res.json({
      message:estudiantes[id_usuario-1]!==undefined?estudiantes[id_usuario-1]:"usuario no encontrado"
    });
  }
)
//Agregar un nuevo usuario a el array "estudiantes"
app.post('/users/agregar/:nombre/:apellido/:telefono',(req,res) =>{
  let id = estudiantes.length+1; //Evitamos el duplicado de id y las hacemos consecutivas
  let nombre = req.params.nombre;
  let apellido = req.params.apellido;
  let telefono = req.params.telefono;

  let objeto_Estudiante = {
    id:id,
    nombre:nombre,
    apellido:apellido,
    telefono:telefono,
  }

  estudiantes.push(objeto_Estudiante);
  res.status(201).send("Usuario Creado Correctamente");
  }
)
app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
