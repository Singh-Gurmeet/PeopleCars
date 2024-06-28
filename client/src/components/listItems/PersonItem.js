import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { DELETE_PERSON, GET_PEOPLE, UPDATE_PERSON } from '../../graphql/operations.js';
import CarItem from './CarItem';
import { Card, Flex } from 'antd';
import EditButton from '../buttons/EditBtn.js';
import DeleteButton from '../buttons/DeleteBtn.js';

const PersonItem = ({ person }) => {
  const [editMode, setEditMode] = useState(false);
  const [firstName, setFirstName] = useState(person.firstName);
  const [lastName, setLastName] = useState(person.lastName);

  const [deletePerson] = useMutation(DELETE_PERSON, {
    refetchQueries: [{ query: GET_PEOPLE }]
  });

  const [updatePerson] = useMutation(UPDATE_PERSON, {
    refetchQueries: [{ query: GET_PEOPLE }]
  });

  const handleDelete = () => {
    deletePerson({ variables: { id: person.id } });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    updatePerson({ variables: { id: person.id, firstName, lastName } });
    setEditMode(false);
  };

  return (
    <Card title={`${person.firstName} ${person.lastName}`} style={{ border: '1px solid #000000', padding: '10px' , textAlign:'left', marginBottom:'10px'}}>
      <div>
        {person.cars.map(car => (
          <CarItem key={car.id} car={car} />
        ))}
      </div>
      {editMode ? (
        <form onSubmit={handleUpdate}>
          <div>
            <label>First Name</label>
            <input 
              type="text" 
              value={firstName} 
              onChange={(e) => setFirstName(e.target.value)} 
            />
          </div>
          <div>
            <label>Last Name</label>
            <input 
              type="text" 
              value={lastName} 
              onChange={(e) => setLastName(e.target.value)} 
            />
          </div>
          <button type="submit">Update</button>
        </form>
      ) : (
        <div>
          <Link to={`/person/${person.id}`}>LEARN MORE</Link>
          <div style={{borderTop: '1px solid #F8F8F8', marginTop:'20px', display: 'flex', justifyContent: 'space-around'}}> 
          <EditButton onClick={() => setEditMode(true)} />
          <DeleteButton onClick={handleDelete} />
          </div>
        </div>
      )}
      
    </Card>
  );
};

export default PersonItem;
