const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { getDoctorInfoController, updateProfileController, getSingleDoctorInfoController } = require('../controllers/doctorCtrl');

router.post('/getDoctorInfo', authMiddleware, getDoctorInfoController);

router.post('/updateProfile', authMiddleware, updateProfileController);

router.post('/get-singledoctoeinfo', authMiddleware, getSingleDoctorInfoController);
module.exports = router;