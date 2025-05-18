// index.js
require('dotenv').config(); // Cargar variables del archivo .env
const express = require('express');
const app = express();

const pool = require('./db/connection'); // Importar conexión a PostgreSQL

const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

app.use('/pacientes', require('./routes/pacientes'));
app.use('/medicos', require('./routes/medicos'));
app.use('/citas', require('./routes/citas'));
app.use('/consultas', require('./routes/consultas'));


// Ruta de prueba para verificar la conexión a la base de datos
app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ message: 'Conexión exitosa', hora_actual: result.rows[0].now });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al conectar con la base de datos' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
