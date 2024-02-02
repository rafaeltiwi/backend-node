const express = require('express');
const cors = require('cors')
const app = express();
const mongoose = require('mongoose');
const routes = require('./src/routes/index')




//Esto deberia ser una variable de entorno
const MONGO_URI = 'mongodb+srv://user_123:mPR5f0gBE491HyAb@cluster0.nn2gwlo.mongodb.net/?retryWrites=true&w=majority';
//conexion a mongoDB atlas
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Conectado a MongoDB Atlas'))
  .catch(err => console.error('Error al conectar a MongoDB', err));
//middlewares
app.use(express.json());

app.use(cors())

//rutas
  routes(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
