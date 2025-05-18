// controllers/pacientesController.js

const pool = require('../db/connection'); 
 // Ajusta si tu archivo tiene otro nombre

// Obtener todos los pacientes
const obtenerPacientes = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM pacientes');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener pacientes:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Obtener paciente por ID
const obtenerPacientePorId = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await pool.query('SELECT * FROM pacientes WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Paciente no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al obtener paciente:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Crear un nuevo paciente
const crearPaciente = async (req, res) => {
  const { nombre, apellido, fecha_nacimiento, sexo, correo, telefono, direccion } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO pacientes (nombre, apellido, fecha_nacimiento, sexo, correo, telefono, direccion)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [nombre, apellido, fecha_nacimiento, sexo, correo, telefono, direccion]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error al crear paciente:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Actualizar paciente existente
const actualizarPaciente = async (req, res) => {
  const id = req.params.id;
  const { nombre, apellido, fecha_nacimiento, sexo, correo, telefono, direccion } = req.body;

  try {
    // Verificamos si el paciente existe
    const pacienteExistente = await pool.query('SELECT * FROM pacientes WHERE id = $1', [id]);
    if (pacienteExistente.rows.length === 0) {
      return res.status(404).json({ error: 'Paciente no encontrado' });
    }

    // Actualizamos paciente
    const result = await pool.query(
      `UPDATE pacientes
       SET nombre = $1, apellido = $2, fecha_nacimiento = $3, sexo = $4, correo = $5, telefono = $6, direccion = $7
       WHERE id = $8
       RETURNING *`,
      [nombre, apellido, fecha_nacimiento, sexo, correo, telefono, direccion, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al actualizar paciente:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Eliminar paciente
const eliminarPaciente = async (req, res) => {
  const id = req.params.id;

  try {
    const pacienteExistente = await pool.query('SELECT * FROM pacientes WHERE id = $1', [id]);
    if (pacienteExistente.rows.length === 0) {
      return res.status(404).json({ error: 'Paciente no encontrado' });
    }

    await pool.query('DELETE FROM pacientes WHERE id = $1', [id]);
    res.json({ mensaje: 'Paciente eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar paciente:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = {
  obtenerPacientes,
  obtenerPacientePorId,
  crearPaciente,
  actualizarPaciente,
  eliminarPaciente,
};
