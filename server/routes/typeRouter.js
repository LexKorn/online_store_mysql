const Router = require('express');
const router = new Router();
const typeController = require('../controllers/typeController');
const checkRole = require('../middlewares/checkRoleMiddleware');

router.post('/', checkRole('ADMIN'), typeController.create);
router.get('/', typeController.getAll);
router.delete('/:name', checkRole('ADMIN'), typeController.delete);
router.put('/:id', checkRole('ADMIN'), typeController.update);


module.exports = router;