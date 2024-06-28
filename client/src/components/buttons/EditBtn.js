import React from 'react';
import { Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';

const EditButton = ({ onClick }) => {
  return (
    <Button type="secondary" icon={<EditOutlined />} onClick={onClick}>
    </Button>
  );
};

export default EditButton;
