import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_PEOPLE } from '../../graphql/operations.js';
import PersonItem from '../listItems/PersonItem';

const PeopleList = () => {
  const { loading, error, data } = useQuery(GET_PEOPLE);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <div >
      {data.people.map(person => (
        <PersonItem key={person.id} person={person} />
      ))}
    </div>
  );
};

export default PeopleList;
