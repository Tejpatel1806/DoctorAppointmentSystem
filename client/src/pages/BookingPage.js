import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useParams } from 'react-router-dom';
const BookingPage = () => {
    const params = useParams();
    const [doctors, setDoctors] = useState([]);

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
                        
                        
                    </div>

                )}
            </div>
        </Layout>


    )
}

export default BookingPage
