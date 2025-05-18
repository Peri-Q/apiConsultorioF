// index.js
require('dotenv').config(); // Cargar variables del archivo .env
const express = require('express');
const app = express();

// Conexión a la base de datos
const pool = require('./db/connection');

// Puerto desde .env o por defecto 3000
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Rutas principales de la API
app.use('/pacientes', require('./routes/pacientes'));
app.use('/medicos', require('./routes/medicos'));
app.use('/citas', require('./routes/citas'));
app.use('/consultas', require('./routes/consultas'));

// Ruta raíz de prueba para verificar que el servidor y la DB funcionan
app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ message: 'Conexión exitosa', hora_actual: result.rows[0].now });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al conectar con la base de datos' });
  }
});

// Middleware para rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

