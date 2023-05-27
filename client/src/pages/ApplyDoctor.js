import React from 'react'
import Layout from './../components/Layout'
import { Col, Row, Input, Form, TimePicker, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { showLoading, hideLoading } from '../redux/features/alertSlice';
import moment from 'moment';
const ApplyDoctor = () => {
    const { user } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleFinish = async (values) => {
        try {
            console.log("hello");
            dispatch(showLoading());
            const res = await axios.post('/api/v1/user/apply-doctor', {
                ...values, userId: user._id, timings: [
                    moment(values.timings[0]).format("HH:mm"),
                    moment(values.timings[1]).format("HH:mm"),
                ]
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            dispatch(hideLoading());
            if (res.data.success) {
                message.success(res.data.message)
                navigate('/');
            }
            else {
                message.error(res.data.success)
            }
        } catch (error) {
            dispatch(hideLoading())
            console.log(error);
            message.error('something went wrong');
        }
    }
    return (
        <Layout>
            <h1 classsName="text-center">Apply doctor</h1>
            {/* onFinish tyare call thase jyare form submit thase ane tyare ek object aavse jema
            form ma je value submit kari te hase 
            have onFinish funcion as a argument tarike te values ne lese ane tene console par print 
            karse */}
            <Form layout="vertical" onFinish={handleFinish} className="m-3">
                <h4 >Personal Details :</h4>
                <Row gutter={20}>

                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="First Name" name="firstName" required rules={[{ required: true }]}>
                            <Input type="text" placeholder="Your First Name"></Input>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="Last Name" name="lastName" required rules={[{ required: true }]}>
                            <Input type="text" placeholder="Your Last Name"></Input>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="Phone No" name="phone" required rules={[{ required: true }]}>
                            <Input type="text" placeholder="Your Contact No."></Input>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="Email" name="email" required rules={[{ required: true }]}>
                            <Input type="text" placeholder="Your Email Address"></Input>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="Website" name="website" >
                            <Input type="text" placeholder="Your Website"></Input>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="Address" name="address" required rules={[{ required: true }]}>
                            <Input type="text" placeholder="Your Clinic Address"></Input>
                        </Form.Item>
                    </Col>


                </Row>
                <h4 >Professional Details :</h4>
                <Row gutter={20}>

                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="Specialization" name="specialization" required rules={[{ required: true }]}>
                            <Input type="text" placeholder="Your Specialization"></Input>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="Experience" name="experience" required rules={[{ required: true }]}>
                            <Input type="text" placeholder="Your Experience"></Input>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="feesPerCunsaltation" name="feespercunsaltation" required rules={[{ required: true }]}>
                            <Input type="text" placeholder="Your feesPerCunsaltation"></Input>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="Timings" name="timings" required rules={[{ required: true }]}>
                            <TimePicker.RangePicker format="HH:mm" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <button className='btn btn-primary form-btn' type="submit">Submit</button>
                    </Col>
                </Row>
            </Form>
        </Layout>


    )
}

export default ApplyDoctor
