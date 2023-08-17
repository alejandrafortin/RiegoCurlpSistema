'Ruta: /api/estudiante';

const { Router } = require('express');

const {getriegos,   getUltimo_registro, getGrafica } = require('../controllers/riego.controller');


const router = Router();

router.get('/', getriegos);
router.get('/ultimo', getUltimo_registro);
router.get('/grafica', getGrafica);


module.exports = router;