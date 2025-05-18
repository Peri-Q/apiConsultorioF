const pool = require('../db/connection');

const obtenerCitas = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM citas');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const obtenerCitaPorId = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM citas WHERE id = $1', [req.params.id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const crearCita = async (req, res) => {
  const { paciente_id, medico_id, fecha_hora, estado } = req.body;
  try {
    await pool.query(
      `INSERT INTO citas (paciente_id, medico_id, fecha_hora, estado)
       VALUES ($1, $2, $3, $4)`,
      [paciente_id, medico_id, fecha_hora, estado]
    );
    res.status(201).json({ mensaje: 'Cita creada' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const actualizarCita = async (req, res) => {
  const { paciente_id, medico_id, fecha_hora, estado } = req.body;
  try {
    await pool.query(
      `UPDATE citas SET paciente_id=$1, medico_id=$2, fecha_hora=$3, estado=$4 WHERE id=$5`,
      [paciente_id, medico_id, fecha_hora, estado, req.params.id]
    );
    res.json({ mensaje: 'Cita actualizada' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const eliminarCita = async (req, res) => {
  try {
    await pool.query('DELETE FROM citas WHERE id = $1', [req.params.id]);
    res.json({ mensaje: 'Cita eliminada' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  obtenerCitas,
  obtenerCitaPorId,
  crearCita,
  actualizarCita,
  eliminarCita,
};
