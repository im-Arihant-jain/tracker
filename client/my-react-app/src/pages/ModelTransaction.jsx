
 import React from 'react';
import { Modal, Form, Input, Select } from 'antd';

const ModelTransaction = ({ modal, setModal, editable, handleSubmit }) => {
  return (
    <Modal
      visible={modal}
      title={editable ? 'Edit transaction' : 'Add Transaction'}
      onCancel={setModal}
      footer={false}
    >
      <Form
        layout='vertical'
        initialValues={editable}
        onFinish={handleSubmit}
      >
        <Form.Item label='Amount' name='amount'>
          <Input type='text' />
        </Form.Item>
        <Form.Item label='Type' name='type'>
          <Select>
            <Select.Option value='expense'>expense</Select.Option>
            <Select.Option value='saving'>saving</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label='Category' name='category'>
          <Select>
            <Select.Option value='salary'>salary</Select.Option>
            <Select.Option value='tip'>tip</Select.Option>
            <Select.Option value='project'>project</Select.Option>
            <Select.Option value='food'>food</Select.Option>
            <Select.Option value='movie'>movie</Select.Option>
            <Select.Option value='bills'>bills</Select.Option>
            <Select.Option value='fee'>fee</Select.Option>
            <Select.Option value='tax'>tax</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label='Reference' name='reference'>
          <Input type='text' />
        </Form.Item>
        <Form.Item label='Description' name='description'>
          <Input type='text' />
        </Form.Item>
        <Form.Item label='Date' name='date'>
          <Input type='date' />
        </Form.Item>
        <div>
          <button type='submit' className='btn btn-secondary'>Save</button>
        </div>
      </Form>
    </Modal>
  );
};

export default ModelTransaction;
