
const doctorModel = require('../models/doctorModel');
const userModel = require('../models/userModels');
const getDoctorInfoController = async (req, res) => {
    try {
        const doctor = await doctorModel.findOne({ userId: req.body.userId });
        console.log(doctor);
        res.status(200).send({
            success: true,
            message: 'doctor data fetch sucess',
            data: doctor,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in fetching doctor details',
            error,
        });
    }
};

const updateProfileController = async (req, res) => {
    try {
        const doctor = await doctorModel.findOneAndUpdate({ userId: req.body.userId }, req.body);
        console.log(req.body);
        res.status(201).send({
            success: true,
            message: 'doctor profile updated',
            data: doctor,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in updating doctor details',
            error,
        });
    }
};
const getSingleDoctorInfoController = async (req, res) => {
    try {
        const doctor = await doctorModel.findOne({ _id: req.body.doctorId });
        res.status(200).send({
            success: true,
            message: 'single Doctor Info Fetched',
            data: doctor,
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: ' Error in fetching Single DoctorInfo  ',
            error
        });
    };
};

module.exports = { getDoctorInfoController, updateProfileController, getSingleDoctorInfoController }