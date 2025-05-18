const pool = require('../db/connection');

// Obtener todos los médicos
const obtenerMedicos = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM medicos');
    res.json(result.rows);
  } catch (err) {
    console.error('Error al obtener médicos:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Obtener médico por ID
const obtenerMedicoPorId = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await pool.query('SELECT * FROM medicos WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Médico no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error al obtener médico:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Crear un nuevo médico
const crearMedico = async (req, res) => {
  const { nombre, apellido, especialidad, correo, telefono } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO medicos (nombre, apellido, especialidad, correo, telefono)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [nombre, apellido, especialidad, correo, telefono]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error al crear médico:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Actualizar médico existente
const actualizarMedico = async (req, res) => {
  const id = req.params.id;
  const { nombre, apellido, especialidad, correo, telefono } = req.body;

  try {
    const medicoExistente = await pool.query('SELECT * FROM medicos WHERE id = $1', [id]);
    if (medicoExistente.rows.length === 0) {
      return res.status(404).json({ error: 'Médico no encontrado' });
    }

    const result = await pool.query(
      `UPDATE medicos
       SET nombre = $1, apellido = $2, especialidad = $3, correo = $4, telefono = $5
       WHERE id = $6
       RETURNING *`,
      [nombre, apellido, especialidad, correo, telefono, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error al actualizar médico:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Eliminar médico
const eliminarMedico = async (req, res) => {
  const id = req.params.id;

  try {
    const medicoExistente = await pool.query('SELECT * FROM medicos WHERE id = $1', [id]);
    if (medicoExistente.rows.length === 0) {
      return res.status(404).json({ error: 'Médico no encontrado' });
    }

    await pool.query('DELETE FROM medicos WHERE id = $1', [id]);
    res.json({ mensaje: 'Médico eliminado correctamente' });
  } catch (err) {
    console.error('Error al eliminar médico:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = {
  obtenerMedicos,
  obtenerMedicoPorId,
  crearMedico,
  actualizarMedico,
  eliminarMedico,
};

