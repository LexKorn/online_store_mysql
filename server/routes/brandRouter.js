const Router = require('express');
const router = new Router();
const brandController = require('../controllers/brandController');
const checkRole = require('../middlewares/checkRoleMiddleware');

router.post('/', checkRole('ADMIN'), brandController.create);
router.get('/', brandController.getAll);
router.delete('/:name', checkRole('ADMIN'), brandController.delete);
router.put('/:id', checkRole('ADMIN'), brandController.update);


module.exports = router;