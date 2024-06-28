import React from 'react';
import { Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const DeleteButton = ({ onClick }) => {
  return (
    <Button type="danger" icon={<DeleteOutlined />} onClick={onClick}>
    </Button>
  );
};

export default DeleteButton;
