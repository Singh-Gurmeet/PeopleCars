import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_CAR, GET_PEOPLE } from '../../graphql/operations.js';

const CarForm = () => {
  const [year, setYear] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [price, setPrice] = useState('');
  const [personId, setPersonId] = useState('');

  const [addCar] = useMutation(ADD_CAR, {
    refetchQueries: [{ query: GET_PEOPLE }]
  });
 
  const { data } = useQuery(GET_PEOPLE);

  const handleSubmit = (e) => {
    e.preventDefault();
    addCar({ variables: { year: parseInt(year), make, model, price: parseFloat(price), personId } })
      .then(() => {
        setYear('');
        setMake('');
        setModel('');
        setPrice('');
        setPersonId('');
      })
      .catch(error => {
        console.error('Error adding car:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'row',justifyContent:'center' }}>
      
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <label style={{ marginRight: '10px', alignSelf: 'center' }}>Year</label>
        <input 
          type="number" 
          value={year} 
          onChange={(e) => setYear(e.target.value)} 
          style={{ flex: 1, padding: '5px', boxSizing: 'border-box' }}
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <label style={{ marginLeft: '20px',marginRight: '10px', alignSelf: 'center' }}>Make</label>
        <input 
          type="text" 
          value={make} 
          onChange={(e) => setMake(e.target.value)} 
          style={{ flex: 1, padding: '5px', boxSizing: 'border-box' }}
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <label style={{marginLeft: '20px', marginRight: '10px',  alignSelf: 'center' }}>Model</label>
        <input 
          type="text" 
          value={model} 
          onChange={(e) => setModel(e.target.value)} 
          style={{ flex: 1, padding: '5px', boxSizing: 'border-box' }}
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <label style={{ marginLeft: '20px',marginRight: '10px',  alignSelf: 'center' }}>Price</label>
        <input 
          type="number" 
          step="0.01"
          value={price} 
          placeholder='$'
          onChange={(e) => setPrice(e.target.value)} 
          style={{ flex: 1, padding: '5px', boxSizing: 'border-box' }}
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <label style={{ marginLeft: '20px',marginRight: '10px',  alignSelf: 'center' }}>Owner</label>
        <select 
          value={personId} 
          onChange={(e) => setPersonId(e.target.value)}
          style={{ flex: 1, padding: '5px', boxSizing: 'border-box' }}
        >
          <option value="">Select Owner</option>
          {data && data.people.map((person) => (
            <option key={person.id} value={person.id}>
              {person.firstName} {person.lastName}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" style={{marginLeft: '20px', padding: '10px 20px', cursor: 'pointer'}}>Add Car</button>
    </form>
  );
};

export default CarForm;
