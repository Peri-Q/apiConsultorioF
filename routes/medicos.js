const express = require('express');
const router = express.Router();
const {
  obtenerMedicos,
  obtenerMedicoPorId,
  crearMedico,
  actualizarMedico,
  eliminarMedico,
} = require('../controllers/medicosController');

router.get('/', obtenerMedicos);
router.get('/:id', obtenerMedicoPorId);
router.post('/', crearMedico);
router.put('/:id', actualizarMedico);
router.delete('/:id', eliminarMedico);

module.exports = router;
