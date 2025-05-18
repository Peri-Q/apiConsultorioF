const pool = require('../db/connection');

const obtenerMedicos = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM medicos');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const obtenerMedicoPorId = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM medicos WHERE id = $1', [req.params.id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const crearMedico = async (req, res) => {
  const { nombre, apellido, especialidad, correo, telefono } = req.body;
  try {
    await pool.query(
      `INSERT INTO medicos (nombre, apellido, especialidad, correo, telefono)
       VALUES ($1, $2, $3, $4, $5)`,
      [nombre, apellido, especialidad, correo, telefono]
    );
    res.status(201).json({ mensaje: 'Médico creado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const actualizarMedico = async (req, res) => {
  const { nombre, apellido, especialidad, correo, telefono } = req.body;
  try {
    await pool.query(
      `UPDATE medicos SET nombre=$1, apellido=$2, especialidad=$3, correo=$4, telefono=$5 WHERE id=$6`,
      [nombre, apellido, especialidad, correo, telefono, req.params.id]
    );
    res.json({ mensaje: 'Médico actualizado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const eliminarMedico = async (req, res) => {
  try {
    await pool.query('DELETE FROM medicos WHERE id = $1', [req.params.id]);
    res.json({ mensaje: 'Médico eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  obtenerMedicos,
  obtenerMedicoPorId,
  crearMedico,
  actualizarMedico,
  eliminarMedico,
};
