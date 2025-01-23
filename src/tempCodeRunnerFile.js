//const { MongoClient } = require('mongodb');
//const uri ="mongodb+srv://santiago894:P5wIGtXue8HvPvli@cluster0.6xkz1.mongodb.net/";
//const cliente = new MongoClient(uri);//

//async function mongoListaDB(client) {
//      try {
//            await client.connect();
//            await listDatabases(client);
//        } catch (e) {
//            console.error(e);
//        }
//}//

//async function listDatabases(client){
//      databasesList = await client.db().admin().listDatabases();
//      console.log("Databases:");
//      databasesList.databases.forEach(db => console.log(` - ${db.name}`));
//};
//  //listDatabases(cliente)
//  
//async function subirEstudiante(client,dbName,estudiante) {
//      try {
//        // Conectar al cliente
//        await client.connect();
//        console.log('Conectado a MongoDB');
//    
//        // Seleccionar la base de datos y colección
//        const db = client.db(dbName);
//        const collection = db.collection('estudiantes');
//    
//        // Subir los datos
//        const resultado = await collection.insertOne(estudiante);
//        console.log("Deberia estar correcto");
//        
//      } catch (error) {
//        console.error('Error al subir estudiante:', error);
//      } finally {
//        // Cerrar la conexión
//        await client.close();
//      }
//    }//
//
//

//        
//            // Llamar a la función
//    //subirEstudiante(cliente,"express",{
//    //        nombre: estudiantes[9].nombre,
//    //        apellido:estudiantes[9].apellido,
//    //        telefono: estudiantes[9].telefono,
//    //});
//    //

//    async function buscarEstudiantes(client) {
//        try {
//          // Conectar al cliente
//          await client.connect();
//          console.log('Conectado a MongoDB');
//      
//          // Acceder a la base de datos y colección
//          let db = client.db('express');
//          let colección = db.collection('estudiantes');
//      
//          // Realizar la consulta y convertir los resultados a un array
//          let estudiantes = await colección.find().toArray();
//      
//          // Devolver los estudiantes
//          return estudiantes;
//        } catch (error) {
//          console.error('Error al buscar estudiante:', error);
//        } finally {
//          await client.close();
//        }
//    }//

//    async function buscarEstudiantePorNombre(client, nombre) {
//        try {
//          // Conectar al cliente
//          await client.connect();
//          console.log('Conectado a MongoDB');
//      
//          // Acceder a la base de datos y colección
//          const db = client.db('express');
//          const colección = db.collection('estudiantes');
//      
//          // Buscar un estudiante por nombre
//          const estudiante = await colección.findOne({ nombre: nombre });
//      
//          // Retornar el resultado
//          return estudiante;
//        } catch (error) {
//          console.error('Error al buscar estudiante por nombre:', error);
//          throw error; // Re-lanzar el error para manejarlo en otro lugar
//        } finally {
//          // Cerrar la conexión
//          await client.close();
//        }
//      }
      

