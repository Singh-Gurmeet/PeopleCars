import React from 'react';
import PersonForm from '../forms/PersonForm';
import CarForm from '../forms/CarForm';
import PersonList from '../lists/PeopleList';

const FormsPage = () => {
  return (
    <div>
      <h2>Add Person</h2>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <PersonForm />
        </div>
        <div>
      <h2>Add Car</h2>
      <div style={{ display: 'flex', justifyContent: 'center' }}></div>
        <CarForm />
      </div>
      <h2>Records</h2>
      <PersonList />
    </div>
  );
};

export default FormsPage;