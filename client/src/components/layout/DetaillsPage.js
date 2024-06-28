import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams, Link } from 'react-router-dom';
import { GET_PERSON_WITH_CARS } from '../../graphql/operations.js';
import CarItem from '../listItems/CarItem.js';

const DetaillsPage = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PERSON_WITH_CARS, {
    variables: { id }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  const person = data.person;

  return (
    <div>
      <h2>{person.firstName} {person.lastName}</h2>
      <div>
        {person.cars.map(car => (
          <CarItem key={car.id} car={car} />
        ))}
      </div>
      <Link to="/">Go Back Home</Link>
    </div>
  );
};

export default DetaillsPage;
