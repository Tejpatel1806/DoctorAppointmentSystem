import React from 'react'
import { Form, Input, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/features/alertSlice';
import '../styles/RegisterStyle.css';
const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onfinishHabdler = async (values) => {
        try {
            //aa niche ni line no matlab em thay k axios request karse login url ne with values stored
            //in variable values and response stored in res variable 
            dispatch(showLoading());
            const res = await axios.post('/api/v1/user/login', values);
            window.location.reload();
            dispatch(hideLoading());
            //response che te object return karse ane te object ma thi success ni value get karie chie aapde
            if (res.data.success) {
                //local storage ma aapde token ne set karyu che with name "token" and value res.data.token
                console.log(res.data.token);
                localStorage.setItem("token", res.data.token);
                message.success('Login Succesfully');
                navigate('/');
            }
            else {
                message.error(res.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
            message.error('something went wrong');
        }
    }
    return (
        <>
            <div className="form-container">
                <Form layout="vertical" onFinish={onfinishHabdler} className="register-form">
                    <h3 className="text-center">Login Form</h3>
                    <Form.Item label="Email" name="email">
                        <Input type="email" required></Input>
                    </Form.Item>
                    <Form.Item label="Password" name="password">
                        <Input type="password" required></Input>
                    </Form.Item>
                    <Link to="/register" className="ms-2">Not a  User Register Here</Link>
                    <button className="btn btn-primary" type="submit">Login</button>
                </Form>
            </div>
        </>
    )
}

export default Login
