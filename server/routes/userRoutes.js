const express = require('express');
const { loginController, registerController, authController, applyDoctorController, getAllNotificationController, deleteAllNotificationController, getAllDoctorsController } = require('../controllers/userCtrl');
const authMiddleware = require('../middlewares/authMiddleware');
//Router Object aama express ni badhi routing functionality add thai jase
const router = express.Router();

//routes


//LOGIN || POST 

//aano matlab evo thay k jyare login ni request aavse tyare te loginController ne call karse je
//call back function che ane te response aapse
router.post('/login', loginController);

//Register || post
router.post('/register', registerController);

//auth

// the code defines a route for handling a POST request to the /getUserData endpoint. Before 
// the request 
// reaches the controller function (authController), the authMiddleware is executed,
//  allowing for any necessary authentication or authorization checks.
router.post('/getUserData', authMiddleware, authController);

router.post('/apply-doctor', authMiddleware, applyDoctorController);

router.post('/get-all-notification', authMiddleware, getAllNotificationController);

router.post('/delete-all-notification', authMiddleware, deleteAllNotificationController);
router.get('/get-All-Doctors', authMiddleware, getAllDoctorsController);

module.exports = router;