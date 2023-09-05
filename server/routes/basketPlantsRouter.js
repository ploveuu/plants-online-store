const Router = require('express');
const router = new Router();
const basketPlantsController = require('../controllers/basketPlantsController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, basketPlantsController.create);
router.delete('/', authMiddleware, basketPlantsController.delete);
router.get('/', authMiddleware, basketPlantsController.getAll);

router.put('/increase', authMiddleware, basketPlantsController.increase);
router.put('/decrease', authMiddleware, basketPlantsController.decrease);

module.exports = router;