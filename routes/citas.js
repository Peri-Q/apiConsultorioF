const express = require('express');
const router = express.Router();
const {
  obtenerCitas,
  obtenerCitaPorId,
  crearCita,
  actualizarCita,
  eliminarCita,
} = require('../controllers/citasController');

router.get('/', obtenerCitas);
router.get('/:id', obtenerCitaPorId);
router.post('/', crearCita);
router.put('/:id', actualizarCita);
router.delete('/:id', eliminarCita);

module.exports = router;

