import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_PERSON, GET_PEOPLE } from '../../graphql/operations.js';

const PersonForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  
  const [addPerson] = useMutation(ADD_PERSON, {
    refetchQueries: [{ query: GET_PEOPLE }],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addPerson({ variables: { firstName, lastName } })
      .then(() => {
        setFirstName('');
        setLastName('');
      })
      .catch(error => {
        console.error('Error adding person:', error.message); // Log the error message
      });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      <label style={{ marginRight: '10px' }}>First Name:</label>
      <input 
        type="text" 
        value={firstName} 
        onChange={(e) => setFirstName(e.target.value)} 
        style={{ marginRight: '10px', width: '150px' }} // Adjust width as needed
      />

      <label style={{ marginRight: '10px' }}>Last Name:</label>
      <input 
        type="text" 
        value={lastName} 
        onChange={(e) => setLastName(e.target.value)} 
        style={{ marginRight: '10px', width: '150px' }} // Adjust width as needed
      />

      <button type="submit">Add Person</button>
    </form>
  );
};

export default PersonForm;
