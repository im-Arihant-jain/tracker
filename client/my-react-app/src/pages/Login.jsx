import React from 'react'
import {Form, Input ,message} from 'antd';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const Navigate = useNavigate();
    const submitHandler = async (values) => {
        try{
         const {data} = await axios.post('http://localhost:8080/api/v1/users/login',values);
          console.log(data);
          message.success("Login successful");
          localStorage.setItem('user', JSON.stringify(data));
          Navigate('/')
        }catch(err){
            message.error("login unsuccesfull");    // office can get cold and hence its always good to 
            console.log(err);
        }
            // reimburse krdenge jpmc vale and hence its always good to jpmorgan and hence its always good to make it count 
    }
  return (
    <div className='register'>
     
        <Form layout='vertical' onFinish={submitHandler}>
        <h1>Login</h1>
            <Form.Item label= 'E-mail' name = 'email'>
                <Input type='emai'/>
            </Form.Item>
            <Form.Item label= 'Password' name = 'password'>
                <Input type='password'/>
            </Form.Item>
            <button type="submit" class="btn btn-primary">Login</button>
        </Form>     
    </div>
  )
}

export default Login;