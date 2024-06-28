import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { DELETE_CAR, GET_PEOPLE, UPDATE_CAR } from '../../graphql/operations.js';
import { Card } from 'antd';
import EditButton from '../buttons/EditBtn.js';
import DeleteButton from '../buttons/DeleteBtn.js';

const CarItem = ({ car }) => {
  const [editMode, setEditMode] = useState(false);
  const [year, setYear] = useState(car.year);
  const [make, setMake] = useState(car.make);
  const [model, setModel] = useState(car.model);
  const [price, setPrice] = useState(car.price);

  const [deleteCar] = useMutation(DELETE_CAR, {
    refetchQueries: [{ query: GET_PEOPLE }]
  });

  const [updateCar] = useMutation(UPDATE_CAR, {
    refetchQueries: [{ query: GET_PEOPLE }]
  });

  const handleDelete = () => {
    deleteCar({ variables: { id: car.id } });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    updateCar({ variables: { id: car.id, year: parseInt(year), make, model, price: parseFloat(price) } });
    setEditMode(false);
  };

  return (
    <Card type="inner" title={`${car.year} ${car.make} ${car.model}`} style={{marginBottom:'20px'}}>
       <p>Price: ${car.price.toFixed(2)}</p>
      {editMode ? (
        <form onSubmit={handleUpdate}>
          <div>
            <label>Year</label>
            <input 
              type="number" 
              value={year} 
              onChange={(e) => setYear(e.target.value)} 
            />
          </div>
          <div>
            <label>Make</label>
            <input 
              type="text" 
              value={make} 
              onChange={(e) => setMake(e.target.value)} 
            />
          </div>
          <div>
            <label>Model</label>
            <input 
              type="text" 
              value={model} 
              onChange={(e) => setModel(e.target.value)} 
            />
          </div>
          <div>
            <label>Price</label>
            <input 
              type="number" 
              step="0.03"
              value={price} 
              onChange={(e) => setPrice(e.target.value)} 
            />
          </div>
          <button type="submit">Update</button>
        </form>
      ) : (
        <div style={{borderTop: '1px solid #F8F8F8', display: 'flex', justifyContent: 'space-around'}}>
          <EditButton onClick={() => setEditMode(true)} />
          <DeleteButton onClick={handleDelete} />
        </div>
      )}
     
    </Card>
  );
};

export default CarItem;
