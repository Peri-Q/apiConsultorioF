// controllers/consultasController.js
const pool = require('../db/connection');

// Obtener todas las consultas
const obtenerConsultas = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM consultas');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener las consultas' });
  }
};

// Obtener una consulta por ID
const obtenerConsultaPorId = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM consultas WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Consulta no encontrada' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener la consulta' });
  }
};

// Crear nueva consulta
const crearConsulta = async (req, res) => {
  const { cita_id, sintomas, diagnostico, tratamiento, notas } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO consultas (cita_id, sintomas, diagnostico, tratamiento, notas)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [cita_id, sintomas, diagnostico, tratamiento, notas]
    );
    res.status(201).json({ mensaje: 'Consulta creada', consulta: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: 'Error al crear la consulta' });
  }
};

// Actualizar una consulta
const actualizarConsulta = async (req, res) => {
  const { cita_id, sintomas, diagnostico, tratamiento, notas } = req.body;
  try {
    const result = await pool.query(
      `UPDATE consultas SET cita_id = $1, sintomas = $2, diagnostico = $3, tratamiento = $4, notas = $5
       WHERE id = $6 RETURNING *`,
      [cita_id, sintomas, diagnostico, tratamiento, notas, req.params.id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Consulta no encontrada' });
    }

    res.json({ mensaje: 'Consulta actualizada', consulta: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar la consulta' });
  }
};

// Eliminar una consulta
const eliminarConsulta = async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM consultas WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Consulta no encontrada' });
    }
    res.json({ mensaje: 'Consulta eliminada' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar la consulta' });
  }
};

module.exports = {
  obtenerConsultas,
  obtenerConsultaPorId,
  crearConsulta,
  actualizarConsulta,
  eliminarConsulta,
};

