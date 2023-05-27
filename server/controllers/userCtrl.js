const userModel = require('../models/userModels');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const doctorModel = require('../models/doctorModel');
const registerController = async (req, res) => {
    try {
        console.log(req.body.email)
        const existinguser = await userModel.findOne({ email: req.body.email });
        console.log("hello")
        if (existinguser) {

            return res.status(200).send({ message: 'UserAlready Exist', success: false });
        }

        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        req.body.password = hashedPassword;
        const newUser = new userModel(req.body);
        await newUser.save();
        res.status(201).send({ message: 'Register Successfully', success: true });
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: `Register Controller ${error.message}` });
    }
};

const loginController = async (req, res) => {
    try {
        //aano matlab user e je email enter karyu che tene search karse userModel schema 
        //ni andar email field ma 
        //ane aa findOne function che te document return karse jena jode e match thayi gayu hase
        //e means jeno email user e email nakhyo ena jevo hase enu object aavse
        //have e object thi enu password ne em badhu mali jase aapn ne 
        //jo user e email nakhyu evu kai madse j nai database ma to null return karse e 
        const user = await userModel.findOne({ email: req.body.email });
        //aa niche ni line no matlab jo user nai made to res.status(200) no matlab response successfully
        //aapyo che ane .send() ni madad thi e response aapse ane ema property tarike message
        //ane success che jeni value emne set kari che 
        if (!user) {
            res.status(200).send({ message: 'user not found', success: false });
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            res.status(200).send({ message: 'Invalid Email and Password', success: false });
        }
        //JWT=JSON WEB TOKEN
        //aano matlab aapde token ma as a id tarike user etle ke jene login karyu che te aavse 
        //ane teno id means user._id aapyu as a id aapde ane ene secret key thi encypt karyu
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        //response jode token pan mokli didhu
        res.status(200).send({ message: 'Login Successfully', success: true, token });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: `ERROR IN LOGIN CONTROL ${error.message}` });
    }
};

const authController = async (req, res) => {
    try {
        // console.log(req.body.userId);
        const user = await userModel.findById({ _id: req.body.userId });
        user.password = undefined;
        if (!user) {
            return res.status(200).send({ message: 'user not found', success: false });
        }
        else {
            res.status(200).send({ success: true, data: user });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'auth error', success: false, error });
    }
};

const applyDoctorController = async (req, res) => {
    try {
        console.log("tej");
        const newDoctor = new doctorModel({ ...req.body, status: 'pending' }); // define the newDoctor object using the schema
        await newDoctor.save();
        const adminUser = await userModel.findOne({ isAdmin: true });
        const notification = adminUser.notification;
        notification.push({
            type: 'apply-doctor-request',
            message: `${newDoctor.firstName} ${newDoctor.lastName} Has Applied For a Doctor Account `,
            data: {
                doctorId: newDoctor._id,
                name: newDoctor.firstName + " " + newDoctor.lastName,
                onClickPath: '/admin/doctors',
            },
        });
        await userModel.findByIdAndUpdate(adminUser._id, { notification })
        res.status(201).send(
            {
                success: true,
                message: 'Doctor Applied Successfully',
            }
        );
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false, // fix the boolean value
            error,
            message: 'Error While Applying a Doctor'
        })
    }
};

const getAllNotificationController = async (req, res) => {
    try {
        const user = await userModel.findOne({ _id: req.body.userId });
        const seennotification = user.seennotification;
        const notification = user.notification;
        seennotification.push(...notification);
        user.notification = [];
        user.seennotification = notification;
        const updateUser = await user.save();
        res.status(200).send({
            success: true,
            message: "Notofication Marked As Read Successfully",
            data: updateUser,
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'Error in Notification'
        })
    }
};

const deleteAllNotificationController = async (req, res) => {
    try {
        const user = await userModel.findOne({ _id: req.body.userId });
        user.notification = [];
        user.seennotification = [];
        const updateUser = await user.save();
        updateUser.password = undefined;
        res.status(200).send({
            success: true,
            message: "Notofication Deleted Successfully",
            data: updateUser,
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "unable to delete all notification",
            error,
        })
    }
};
const getAllDoctorsController = async (req, res) => {
    try {
        const doctors = await doctorModel.find({ status: 'approved' });
        res.status(200).send({
            success: true,
            data: doctors,
            message: 'Doctor list fetch successfully'
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'Error While getting all Doctor'
        })
    }
};


module.exports = { loginController, registerController, authController, applyDoctorController, getAllNotificationController, deleteAllNotificationController, getAllDoctorsController };
