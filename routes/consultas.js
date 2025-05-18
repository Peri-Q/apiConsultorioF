const express = require('express');
const router = express.Router();
const {
  obtenerConsultas,
  obtenerConsultaPorId,
  crearConsulta,
  actualizarConsulta,
  eliminarConsulta,
} = require('../controllers/consultasController');

router.get('/', obtenerConsultas);
router.get('/:id', obtenerConsultaPorId);
router.post('/', crearConsulta);
router.put('/:id', actualizarConsulta);
router.delete('/:id', eliminarConsulta);

module.exports = router;

