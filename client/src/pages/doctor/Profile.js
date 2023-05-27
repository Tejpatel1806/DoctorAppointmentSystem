import React, { useState, useEffect } from 'react'
import Layout from './../../components/Layout';
import { useSelector } from 'react-redux';
import { Col, Row, Input, Form, TimePicker, message } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { showLoading, hideLoading } from '../../redux/features/alertSlice';
import { useParams } from 'react-router-dom';
import moment from 'moment';
const Profile = () => {
  const user = useSelector(state => state.user);
  const [doctor, setDoctor] = useState({});
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleFinish = async (values) => {
    try {
      console.log("hello");
      dispatch(showLoading());
      const res = await axios.post('/api/v1/doctor/updateProfile', {
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
  const getDoctorInfo = async () => {
    try {
      const value = await localStorage.getItem('token');
      console.log(value);
      const res = await axios.post('/api/v1/doctor/getDoctorInfo', { userId: params.id }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (res?.data.success) {
        console.log(res.data.data);
        setDoctor(res.data.data);
        console.log(doctor);

      }

    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getDoctorInfo();
    // eslint-disable-next-line 
  }, [])
  console.log(doctor);
  return (

    <Layout>
      <h1>Manage Profile Page</h1>

      {Object.keys(doctor).length > 0 ? (
        <Form
          layout="vertical"
          onFinish={handleFinish}
          className="m-3"
          initialValues={{
            ...doctor,
            timings: [
              moment(doctor.timings[0], 'HH:mm'),
              moment(doctor.timings[1], 'HH:mm'),
            ],
          }}
        >
          <h4>Personal Details:</h4>
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="First Name"
                name="firstName"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Your First Name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Last Name"
                name="lastName"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Your Last Name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Phone No"
                name="phone"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Your Contact No." />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Email"
                name="email"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Your Email Address" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label="Website" name="website">
                <Input type="text" placeholder="Your Website" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Address"
                name="address"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Your Clinic Address" />
              </Form.Item>
            </Col>
          </Row>
          <h4>Professional Details:</h4>
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Specialization"
                name="specialization"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Your Specialization" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Experience"
                name="experience"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Your Experience" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="feesPerCunsaltation"
                name="feespercunsaltation"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Your feesPerCunsaltation" />
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
              <button className='btn btn-primary form-btn' type="submit">Update</button>
            </Col>
          </Row>
        </Form>



        /* // <Form layout="vertical" onFinish={handleFinish} className="m-3" initialValues={doctor}>
        //   <h4 >Personal Details :</h4>
        //   <Row gutter={20}>
        //     <Col xs={24} md={24} lg={8}>
        //       <Form.Item label="First Name" name="firstName" required rules={[{ required: true }]}>
        //         <Input type="text" placeholder="Your First Name" ></Input>
        //       </Form.Item>
        //     </Col>
        //     <Col xs={24} md={24} lg={8}>
        //       <Form.Item label="Last Name" name="lastName" required rules={[{ required: true }]}>
        //         <Input type="text" placeholder="Your Last Name" ></Input>
        //       </Form.Item>
        //     </Col>
        //     <Col xs={24} md={24} lg={8}>
        //       <Form.Item label="Phone No" name="phone" required rules={[{ required: true }]}>
        //         <Input type="text" placeholder="Your Contact No." ></Input>
        //       </Form.Item>
        //     </Col>
        //     <Col xs={24} md={24} lg={8}>
        //       <Form.Item label="Email" name="email" required rules={[{ required: true }]}>
        //         <Input type="text" placeholder="Your Email Address" ></Input>
        //       </Form.Item>
        //     </Col>
        //     <Col xs={24} md={24} lg={8}>
        //       <Form.Item label="Website" name="website" >
        //         <Input type="text" placeholder="Your Website" ></Input>
        //       </Form.Item>
        //     </Col>
        //     <Col xs={24} md={24} lg={8}>
        //       <Form.Item label="Address" name="address" required rules={[{ required: true }]}>
        //         <Input type="text" placeholder="Your Clinic Address" ></Input>
        //       </Form.Item>
        //     </Col>


        //   </Row>
        //   <h4 >Professional Details :</h4>
        //   <Row gutter={20}>

        //     <Col xs={24} md={24} lg={8}>
        //       <Form.Item label="Specialization" name="specialization" required rules={[{ required: true }]}>
        //         <Input type="text" placeholder="Your Specialization" ></Input>
        //       </Form.Item>
        //     </Col>
        //     <Col xs={24} md={24} lg={8}>
        //       <Form.Item label="Experience" name="experience" required rules={[{ required: true }]}>
        //         <Input type="text" placeholder="Your Experience"></Input>
        //       </Form.Item>
        //     </Col>
        //     <Col xs={24} md={24} lg={8}>
        //       <Form.Item label="feesPerCunsaltation" name="feespercunsaltation" required rules={[{ required: true }]}>
        //         <Input type="text" placeholder="Your feesPerCunsaltation"></Input>
        //       </Form.Item>
        //     </Col>
        //     <Col xs={24} md={24} lg={8}>
        //       <Form.Item label="Timings" name="timings" required rules={[{ required: true }]}>
        //         <TimePicker.RangePicker format="HH:mm" />
        //       </Form.Item>
        //     </Col>
        //     <Col xs={24} md={24} lg={8}>
        //     </Col>
        //     <Col xs={24} md={24} lg={8}>
        //       <button className='btn btn-primary form-btn' type="submit">Submit</button>
        //     </Col>
        //   </Row>
        // </Form> */
        /* <h1> mu name is yej</h1> */
      ) : <h1>there is error to fetch data</h1>}

    </Layout>
  );
}


export default Profile
