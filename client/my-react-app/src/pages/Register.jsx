import React from 'react'
import {Form, Input,message} from 'antd';
import axios from 'axios'
axios.defaults.withCredentials = true;
import { useNavigate } from 'react-router-dom';
const Register = () => {
    const Navigate = useNavigate();
    const submitHandler = async (values) => {
        try{
          const {data} = await axios.post('https://expensetracker-seven-pearl.vercel.app/api/v1/users/register',values);
          message.success("Registration successfull");
          console.log(data);
          Navigate('/login')
        }catch(err){
            console.log(err);
        }

        
    }
  return (
    <div className='register'>
     
        <Form layout='vertical' onFinish={submitHandler} >
        <h1>Register</h1>
            <Form.Item label= 'Name' name = 'name'>
                <Input/>
            </Form.Item>
            <Form.Item label= 'E-mail' name = 'email'>
                <Input type='emai'/>
            </Form.Item>
            <Form.Item label= 'Password' name = 'password'>
                <Input type='password'/>
            </Form.Item>
            <button type="submit" class="btn btn-primary">Register</button>
        </Form>
    </div>
  )
}
    // papa kya kr rhe 
export default Register