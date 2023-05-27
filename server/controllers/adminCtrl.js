const { response } = require('express');
const doctorModel = require('../models/doctorModel');
const userModel = require('../models/userModels');
const getAllUsersControllers = async (req, res) => {
    try {
        const users = await userModel.find({})
        res.status(200).send({
            success: true,
            message: 'users data',
            data: users,
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'error while fetching the users',
            error,
        })
    }

};

const getAllDoctorsControllers = async (req, res) => {
    try {
        const doctors = await doctorModel.find({})
        res.status(200).send({
            success: true,
            message: 'doctors data',
            data: doctors,
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'error while fetching the doctors',
            error,
        })
    }

};

const ChangeAccountStatusController = async (req, res) => {
    try {
        const { doctorId, status } = req.body;
        const doctor = await doctorModel.findByIdAndUpdate(doctorId, { status });
        const user = await userModel.findOne({ _id: doctor.userId });
        // console.log(user);
        const notification = user.notification;
        notification.push({
            type: 'doctor-account-request-updated',
            message: `Your Docotr Account Request Has ${status}`,
            onClickPath: '/notification,'
        });
        user.isDoctor = status === "approved" ? true : false;
        await user.save();
        res.status(201).send({
            success: true,
            message: 'Account Status Updated',
            data: doctor,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'error in account section',
            error,
        })
    }
};

module.exports = { getAllUsersControllers, getAllDoctorsControllers, ChangeAccountStatusController }