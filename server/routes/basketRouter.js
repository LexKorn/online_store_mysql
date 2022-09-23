const Router = require('express');
const router = new Router();

const authMiddleware = require('../middlewares/authMiddleware');
const baskerController = require('../controllers/baskerController');


router.post('/', authMiddleware, baskerController.addToBasket);
router.get('/', authMiddleware, baskerController.getBasketUser);
router.delete('/:id', authMiddleware, baskerController.delete);

module.exports = router;