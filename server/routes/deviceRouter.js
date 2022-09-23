const Router = require('express');
const router = new Router();
const deviceController = require('../controllers/deviceController');
const checkRole = require('../middlewares/checkRoleMiddleware');

router.post('/', checkRole('ADMIN'), deviceController.create);
router.get('/', deviceController.getAll);
router.get('/:id', deviceController.getONe);
router.delete('/:id', checkRole('ADMIN'), deviceController.delete);
router.put('/:id', checkRole('ADMIN'), deviceController.update);


module.exports = router;