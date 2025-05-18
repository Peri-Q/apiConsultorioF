const pool = require('../db/connection');

const obtenerConsultas = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM consultas');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const obtenerConsultaPorId = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM consultas WHERE id = $1', [req.params.id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const crearConsulta = async (req, res) => {
  const { cita_id, sintomas, diagnostico, tratamiento, notas } = req.body;
  try {
    await pool.query(
      `INSERT INTO consultas (cita_id, sintomas, diagnostico, tratamiento, notas)
       VALUES ($1, $2, $3, $4, $5)`,
      [cita_id, sintomas, diagnostico, tratamiento, notas]
    );
    res.status(201).json({ mensaje: 'Consulta creada' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const actualizarConsulta = async (req, res) => {
  const { cita_id, sintomas, diagnostico, tratamiento, notas } = req.body;
  try {
    await pool.query(
      `UPDATE consultas SET cita_id=$1, sintomas=$2, diagnostico=$3, tratamiento=$4, notas=$5 WHERE id=$6`,
      [cita_id, sintomas, diagnostico, tratamiento, notas, req.params.id]
    );
    res.json({ mensaje: 'Consulta actualizada' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const eliminarConsulta = async (req, res) => {
  try {
    await pool.query('DELETE FROM consultas WHERE id = $1', [req.params.id]);
    res.json({ mensaje: 'Consulta eliminada' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  obtenerConsultas,
  obtenerConsultaPorId,
  crearConsulta,
  actualizarConsulta,
  eliminarConsulta,
};
