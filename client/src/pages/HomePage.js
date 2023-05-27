import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout';
import { Row } from 'antd';
import DoctorList from '../components/DoctorList';

const HomePage = () => {
    const navigate = useNavigate();
    const [doctors, setDoctors] = useState([]);
    //login user data 
    const getUserData = async () => {
        try {
            console.log(localStorage.getItem("token"));
            const res = await axios.get('/api/v1/user/get-All-Doctors', {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            });
            // console.log(res.data);
            // if(res.data.success==false){
            //     navigate('/Login')
            // }
            if (res.data.success) {
                setDoctors(res.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getUserData();
    }, []);

    return (
        <Layout>
            <h1 className="text-center">Home page</h1>
            <Row>
                {doctors && doctors.map(doctor => (
                    <DoctorList doctor={doctor}></DoctorList>
                ))}
            </Row>
        </Layout>


    )
}

export default HomePage
