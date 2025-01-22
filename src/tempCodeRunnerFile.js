
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