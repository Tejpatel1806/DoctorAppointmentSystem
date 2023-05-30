import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { DatePicker, TimePicker, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { showLoading, hideLoading } from '../redux/features/alertSlice';
import moment from 'moment';
const BookingPage = () => {
    const { user } = useSelector(state => state.user);
    const params = useParams();
    const dispatch = useDispatch();
    const [doctors, setDoctors] = useState([]);
    const [date, setDate] = useState();
    const [time, setTime] = useState();
    const [isavailable, setIsavailable] = useState();


    const getUserData = async () => {
        try {
            console.log(localStorage.getItem("token"));
            const res = await axios.post('/api/v1/doctor/get-singledoctoeinfo',
                { doctorId: params.doctorId },
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                });

            if (res.data.success) {
                setDoctors(res.data.data);
                console.log(res.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handlebooking = async () => {
        try {
            setIsavailable(true);
            if (!date && !time) {
                return alert('Date and time required');
            }
            dispatch(showLoading());
            const res = await axios.post('/api/v1/user/book-appointment', {
                doctorId: params.doctorId,
                userId: user._id,
                doctorInfo: doctors,
                userInfo: user,
                date: date,
                time: time,
            }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            })
            dispatch(hideLoading());
            if (res.data.success) {
                message.success(res.data.message);
            }

        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
        }
    }
    const handleAvailability = async () => {
        try {

            dispatch(showLoading());
            const res = await axios.post('/api/v1/user/booking-availability', { doctorId: params.doctorId, date, time }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            });
            dispatch(hideLoading());
            if (res.data.success) {
                setIsavailable(true);
                message.success(res.data.message);
            }
            else {
                message.error(res.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
        }
    }
    useEffect(() => {
        getUserData();
        //eslint-disable-next-line
    }, []);
    console.log(doctors);
    return (


        <Layout>
            <h3>Booking Page</h3>
            <div className="container m-2">
                {doctors && (
                    <div>
                        <h4>
                            Dr. {doctors.firstName} {doctors.lastName}
                        </h4>
                        {/* <h4>
                            Timings:- {doctors.timings[0]}- {doctors.timings[1]}
                        </h4> */}
                        <div className='d-flex flex-column w-50'>
                            <DatePicker className='m-2' format="DD-MM-YYYY" onChange={(value) => { setIsavailable(true); setDate(moment(value).format("DD-MM-YYYY")) }}></DatePicker>
                            <TimePicker className='m-2' format="HH:mm" onChange={(value) => { setIsavailable(true); setTime(moment(value).format("HH:mm")) }}></TimePicker>
                            <button className='btn btn-primary mt-2' onClick={handleAvailability}>Check Availability</button>
                            {!isavailable && (
                                <button className='btn btn-dark mt-2' onClick={handlebooking}>Book Now</button>
                            )}
                        </div>

                    </div>

                )}
            </div>
        </Layout>


    )
}

export default BookingPage
