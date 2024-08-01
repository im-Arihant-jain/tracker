import React, {useEffect, useState} from 'react'
import Layout from '../components/Layout'
 import axios from 'axios'
 axios.defaults.withCredentials = true;
import { Button ,Input,Form,Modal, Select, message, Table} from 'antd';
import Analytics from '../components/Analytics';
import './index.css'
import {DeleteOutlined, EditOutlined } from '@ant-design/icons'
import ProductsComponent from './ProductComponent';
import Reviews from './Reviews';
import ModelTransaction from './ModelTransaction';
// import Group  from '../components/Group';
const Homepage = () => {
  const [modal,setmodal] = useState(false);
  const [frequency,setFrequency] = useState('7');
  const [type,setType] = useState('all');
 const [alltransactions, setAlltransactions] = useState([]);
 const [submit,setSubmit] = useState(false);
 const [groupdata, setgroupdata] = useState([]);
 const [isAnalytics,setIsAnalytics]  = useState(false);
 const [editable,setEditable] = useState(null)
 const [tobedel ,setTobedel] = useState(null);
 const [create, setcreate] = useState(false)
 const [join,setjoin]  = useState(false);
 const [groups, setGroups] = useState([]);
 const [showgroup , setshowgroup] = useState(false);
 const [reviews , setReviews] = useState(false);
 const [revs , setRevs] = useState([]); // usi ki prep kr rha tha ekjyadatar time mera agar mai and hence its jab tak intern nhi lag jaat ito fir cp 
 const showform = false;
 const log = JSON.parse(localStorage.getItem('user'));
 const handleSubmitreview = async (values) =>{
    console.log(values);// groups groupdata.userid paas krenge and logedin in user kaa bhi paas krenge apni id bhi paas krunga 
    try{
        
        const logname = log.name
        console.log(logname);
        console.log(groupdata);
        const userid = groupdata[0].userid
        const review = values.review;
        const res = await axios.post('https://expensetracker-seven-pearl.vercel.app/api/v1/users/review', {
          logname,  userid, review
      });

      console.log(res);
      // setRevs()
      // review, userid, logid
    }catch(err){
      console.log(err);

    }
 }
 const handlesetModal= ()=>{
  setmodal(false);
 }
 const handleDelete = async (record) => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user);    // shrila prabhupada krishn  a kripamurty prabhu[ada kripa murty
    console.log(record);
    await axios.post('https://expensetracker-seven-pearl.vercel.app/api/v1/transaction/delete-transaction', {
      transactionId: record._id
    });
    message.success('Entry deleted');
    setSubmit(!submit);
  //  fetchAllTransactions(); // Refresh the transactions list after deletion
  } catch (error) {
    console.log(error);
    message.error('Failed to delete entry');
  }
};
const handleSubmitjoin =async  (values) =>{
  // console.log(values.groups);   
  // console.log(groups);
  const result = groups.filter( group => group.name == values.groups);   
  console.log(result[0].transactions);
  setgroupdata(result[0].transactions);
  setshowgroup(true)
  
}
const handleSubmitgroup = async (values)=>{
  try{
    const user = JSON.parse(localStorage.getItem('user'));
        console.log(user);
        console.log(values);
        
        const res = await axios.post('https://expensetracker-seven-pearl.vercel.app/api/v1/group/create-group', { user_id: user._id, name: values.name } );
        console.log(res);
        // core subjects padh leta
        message.success('entry added');      
  }catch(err){
    console.log(err);
    message.error('entry del');

  }
}
useEffect(() => {
  // Function to fetch groups from the API
  const fetchGroups = async () => {
    try {
      const res = await axios.get(`https://expensetracker-seven-pearl.vercel.app/api/v1/group/get-group`);
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
          await axios.post('https://expensetracker-seven-pearl.vercel.app/api/v1/transaction/edit-transaction',{payload:{userid: user._id, ...values} , transactionId:editable._id})
          setEditable(null);
          // core subjects padh leta
          message.success('entry updated');
        }else{
          const user = JSON.parse(localStorage.getItem('user'));
        console.log(user);
        await axios.post('https://expensetracker-seven-pearl.vercel.app/api/v1/transaction/add-transaction',{userid: user._id, ...values})
        setEditable(null);
        // core subjects padh leta
        message.success('entry added');
        }
        setSubmit(!submit);
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
       const res =  await axios.post('https://expensetracker-seven-pearl.vercel.app/api/v1/transaction/get-transaction',{type,frequency,userid: user._id})
        // console.log(alltransactions);
        setAlltransactions(res.data);
      }catch(error){
        message.error("not-fetched-properly");
        console.log(error);
      }     // I will study from a tutorial
    
    }
    getAllTransactions();
  },[frequency ,type,submit])
  // OPTION NHI HAI NAA KYA KREIN NHI K RHA ACCOMODATION MAI AND HENCE I
  const columns = [
    {
      title: 'Date',
      dataIndex: 'date'
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
    <div className='full'>
      
       <div className='revsechome' >
         
         <div className='filters'>
        
        <button style={{ backgroundColor: '#ffdd40',color:'brown', fontWeight:'bold' }} className='btn btn-secondary' onClick={()=> setmodal(true)}>Add New</button>
        <button style={{ backgroundColor: '#ffdd40',color:'brown', fontWeight:'bold' }} className='btn btn-secondary' onClick={()=>{
           setIsAnalytics(!isAnalytics)
           setshowgroup(false);
           // great for brain stormning
           }}>{!isAnalytics? `Show My Analytics`: `Show My Expenses`}</button>
        <button className='btn btn-secondary' style={{ backgroundColor: '#ffdd40',color:'brown', fontWeight:'bold' }}
 onClick={()=> {setcreate(!create)}}>Share Your Progress</button>
        <button className='btn btn-secondary' onClick={()=> setjoin(!join)} style={{ backgroundColor: '#ffdd40',color:'brown', fontWeight:'bold' }}>View Users</button>
        {/* <button className='btn btn-secondary' onClick={()=> {
          setmodal(false)
          // ab vo khgi mai metal ki dress pehnti huu nd hence
          setReviews(!reviews)
          }}>View Reviews</button> */}
          {/* until meri jaldi uthne kaa and hence its always good to make intern nhi lag jaaati it makes a lot of sense to do dsa so I will go that way definetly and rest I will go like */}
       </div>
       <div className="container">
      
        <div className="selector">
          <h6>Select frequency</h6>
          <Select  value={frequency} onChange={(values) => setFrequency(values)}>
            <Select.Option value="7">Last Week</Select.Option>
            <Select.Option value="30">Last Month</Select.Option>
            <Select.Option value="365">Last Year</Select.Option>
          </Select>
        </div>
        <div className="revhead">{isAnalytics? ``: `EXPENSES`}</div>
        <div className="selector">
          <h6>Select Expense-Type</h6>
          <Select value={type} onChange={(values) => setType(values)}>
            <Select.Option value="all">All</Select.Option>
            <Select.Option value="expense">Expense</Select.Option>
            <Select.Option value="saving">Saving</Select.Option>
          </Select>
        </div>
     
      
    </div>
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
                     <button type='submit' className='btn btn-secondary' >Save</button>
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
       {/* <Reviews/> */}
     {/* <ProductsComponent/> */}
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
      <Modal visible={join} title = 'Share a user_name' 
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
      
      <ModelTransaction
        modal={modal}
        setModal={handlesetModal}
        editable={editable}
        handleSubmit={handleSubmit}
      />

</div>
    
  )
}

export default Homepage