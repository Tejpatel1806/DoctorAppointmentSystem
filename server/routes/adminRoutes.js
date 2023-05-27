const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { getAllUsersControllers, getAllDoctorsControllers, ChangeAccountStatusController } = require('../controllers/adminCtrl');


router.get('/getAllUsers', authMiddleware, getAllUsersControllers);

router.get('/getAllDoctors', authMiddleware, getAllDoctorsControllers);

router.post('/ChangeAccountStatusController', authMiddleware, ChangeAccountStatusController)
module.exports = router;