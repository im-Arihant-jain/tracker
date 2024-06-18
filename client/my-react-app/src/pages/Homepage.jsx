import React, {useEffect, useState} from 'react'
import Layout from '../components/Layout'
 import axios from 'axios'
import { Button ,Input,Form,Modal, Select, message, Table} from 'antd';
import Analytics from '../components/Analytics';

import {DeleteOutlined, EditOutlined } from '@ant-design/icons'
// import Group  from '../components/Group';
const Homepage = () => {
  const [modal,setmodal] = useState(false);
  const [frequency,setFrequency] = useState('7');
  const [type,setType] = useState('all');
 const [alltransactions, setAlltransactions] = useState([]);
 
 const [groupdata, setgroupdata] = useState([]);
 const [isAnalytics,setIsAnalytics]  = useState(false);
 const [editable,setEditable] = useState(null)
 const [tobedel ,setTobedel] = useState(null);
 const [create, setcreate] = useState(false)
 const [join,setjoin]  = useState(false);
 const [groups, setGroups] = useState([]);
 const [showgroup , setshowgroup] = useState(false);
 const showform = false;
 const handleSubmitreview = (values) =>{
  console.log(values);
 }
 const handleDelete = async (record) => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user);    // shrila prabhupada krishn  a kripamurty prabhu[ada kripa murty
    console.log(record);
    await axios.post('http://localhost:8080/api/v1/transaction/delete-transaction', {
      transactionId: record._id
    });
    message.success('Entry deleted');
  //  fetchAllTransactions(); // Refresh the transactions list after deletion
  } catch (error) {
    console.log(error);
    message.error('Failed to delete entry');
  }
};
const handleSubmitjoin =async  (values) =>{
  console.log(values.groups);   
  console.log(groups);
  const result = groups.filter( group => group.name == values.groups);  // lagata tujhe mere naam kaa jikar kabhi bhi hoga nhi an d
  // console.log(alltransactions);
  console.log(result[0].transactions);
  setgroupdata(result[0].transactions);
  
}
const handleSubmitgroup = async (values)=>{
  try{
    const user = JSON.parse(localStorage.getItem('user'));
        console.log(user);
        console.log(values);
        
        const res = await axios.post('http://localhost:8080/api/v1/group/create-group', { user_id: user._id, name: values.name } );
        console.log(res);
        // core subjects padh leta
        message.success('entry added');     // is it gonna be
  }catch(err){
    console.log(err);
    message.error('entry del');

  }
}
useEffect(() => {
  // Function to fetch groups from the API
  const fetchGroups = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/v1/group/get-group`);
      // console.log(res.data)  
      setGroups(res.data.groupdata); // Assuming the response has a groups array
    } catch (err) {
      console.error(err);
      message.error('Failed to fetch groups');
    }
  };

  fetchGroups();
}, []);
  const handleSubmit = async (values)=>{
      try{
        if(editable){
          const user = JSON.parse(localStorage.getItem('user'));
          console.log(user);
          await axios.post('http://localhost:8080/api/v1/transaction/edit-transaction',{payload:{userid: user._id, ...values} , transactionId:editable._id})
          setEditable(null);
          // core subjects padh leta
          message.success('entry updated');
        }else{
          const user = JSON.parse(localStorage.getItem('user'));
        console.log(user);
        await axios.post('http://localhost:8080/api/v1/transaction/add-transaction',{userid: user._id, ...values})
        setEditable(null);
        // core subjects padh leta
        message.success('entry added');
        }
      }catch(err){
        console.log(err);
      }
  }
  const components = {
    header: {
        row: (props) => <tr {...props} className="custom-header" />,
    },
};
  useEffect(()=>{
    const getAllTransactions = async () =>{
      try{
        // console.log(type);
        const user = JSON.parse(localStorage.getItem('user'));
       const res =  await axios.post('http://localhost:8080/api/v1/transaction/get-transaction',{type,frequency,userid: user._id})
        // console.log(alltransactions);
        setAlltransactions(res.data);
      }catch(error){
        message.error("not-fetched-properly");
        console.log(error);
      }     // I will study from a tutorial
    
    }
    getAllTransactions();
  },[frequency ,type])
  // OPTION NHI HAI NAA KYA KREIN NHI K RHA ACCOMODATION MAI AND HENCE I
  const columns = [
    {
      title: 'Date',
      dataIndex: 'date'
    },
    {
      title: 'Roll No.',
      dataIndex: 'rollnum'
    },
    {
      title: 'Type',
      dataIndex: 'type'
    },
    {
      title: 'Amount',
      dataIndex: 'amount'
    },
    {
      title: 'Category',
      dataIndex: 'category'
    },
    {
      title: 'Description',
      dataIndex: 'description'
    },
    {
      title: 'Reference',
      dataIndex: 'reference'
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (text, record) => (
        <div>
          <EditOutlined onClick={() => {
            setmodal(true);
            setEditable(record);
          }} />
          <DeleteOutlined className='mx-2' onClick={() => { handleDelete(record);
          }} />
        </div>
      )
    },
  ];
  return (
    <Layout>
       <div className='filters'>
         
        <div>
          <h6>Select frequency</h6>
          <Select value={frequency } onChange={(values)=>setFrequency(values)}>
          <Select.Option value='7'>Last Week</Select.Option>
          <Select.Option value='30'>Last Month</Select.Option>
          <Select.Option value='365'>Last Year</Select.Option>
          </Select>
        </div>    
        <div>
          <h6>Select Expense-Type</h6>
          <Select value={type} onChange={(values) => setType(values)}> {/* Fixed value binding */}
            <Select.Option value='all'>All</Select.Option>
            <Select.Option value='expense'>Expense</Select.Option>
            <Select.Option value='saving'>Saving</Select.Option>
        </Select>
        </div>
        <button className='btn btn-secondary' onClick={()=> setmodal(true)}>Add New</button>
        <button className='btn btn-secondary' onClick={()=>{
           setIsAnalytics(!isAnalytics)
           setshowgroup(false);
           // great for brain stormning
           }}>View Analytics</button>
        <button className='btn btn-secondary' onClick={()=> {setcreate(!create)}}>Share Analytics</button>
        <button className='btn btn-secondary' onClick={()=> setjoin(!join)}>View Users</button>
        <button className='btn btn-secondary' onClick={()=> {
          setIsAnalytics(false);
          setmodal(false);
          setshowgroup(!showgroup)
          }}>View others analytics</button>
        
       </div>
       <div className='w-full mx-0 align-center'>
         {showgroup && 
         <>
         <Analytics alltransactions={groupdata}/> 
       
          
            <Form layout = 'vertical'
                     // initialValues={editable}
                      onFinish={handleSubmitreview}
                     >
                   <Form.Item label = 'Review' name = 'review'>
                     <Input type="text" /> 
                   </Form.Item>
                   <div>
                     <button type='submit' className='btn btn-secondary'>Save</button>
                   </div>
           </Form>
           </>
        } 
       {isAnalytics === false ? <Table
       bordered
    columns={columns}   
    components={components}
    rowClassName={() => 'custom-row-style'}
    dataSource={alltransactions.map(transaction => ({
      ...transaction,
      key: transaction._id2 // Assuming 'id' is a unique identifier for each transaction
    }))}
  /> : <Analytics alltransactions={alltransactions}/>}
       </div>
       <Modal visible ={create}  title = "Create Group" 
      onCancel={() => setcreate(false)}
      footer = {false}
      >   <Form layout = 'vertical'
                // initialValues={editable}
                onFinish={handleSubmitgroup}
                >
              <Form.Item label = 'Name' name = 'name'>
                <Input type="text" /> 
              </Form.Item>
              <div>
                <button type='submit' className='btn btn-secondary'>Save</button>
              </div>
      </Form>
      </Modal>
      <Modal visible={join} title = 'Select group' 
      onCancel={() => setjoin(false)}
      footer = {false}
      >   
      <Form layout = 'vertical'
              //  initialValues={editable}
                 onFinish={handleSubmitjoin}
                > 
      <Form.Item label="Groups" name="groups">
      <Select>
        {groups.map((group) => (
          <Select.Option key={group._id} value={group.name}>
            {group.name}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
    <div>
           <button type='submit' className='btn btn-secondary'>Save</button>
          </div>  
    </Form>
      </Modal>
      <Modal visible={modal} title = {editable ? 'Edit transaction' : "Add Transaction"} 
      onCancel={() => setmodal(false)}
      footer = {false}
      
      >   <Form layout = 'vertical'
                initialValues={editable}
                onFinish={handleSubmit}>
              <Form.Item label = 'Amount' name = 'amount'>
                <Input type="text" />   
              </Form.Item>
              <Form.Item label = 'Type' name = 'type'>
                <Select>
                  <Select.Option value ="expense">expense</Select.Option>
                  <Select.Option value ="saving">saving</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label = 'Category' name = 'category'>
                <Select>
                  <Select.Option value ="salary"></Select.Option>
                  <Select.Option value ="tip"></Select.Option>
                  <Select.Option value ="project"></Select.Option>
                  <Select.Option value ="food"></Select.Option>
                  <Select.Option value ="movie"></Select.Option>
                  <Select.Option value ="bills"></Select.Option>
                  <Select.Option value ="fee"></Select.Option>
                  <Select.Option value ="tax"></Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label = 'Reference' name = 'reference'>
                <Input type="text" /> 
              </Form.Item>
              <Form.Item label = 'Description' name = 'description'>
                <Input type="text" /> 
              </Form.Item>
              <Form.Item label = 'Date' name = 'date'>
                <Input type="date" /> 
              </Form.Item>
              <div>
                <button type='submit' className='btn btn-secondary'>Save</button>
              </div>
      </Form>
      </Modal>
    </Layout>
    
  )
}

export default Homepage