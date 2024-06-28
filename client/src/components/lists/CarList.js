import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_CARS } from '../../graphql/operations.js';

const CarList = () => {
  const { loading, error, data } = useQuery(GET_CARS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <div>
      {data.cars.map(car => (
        <div key={car.id}>
          <p>{car.year} {car.make} {car.model} - ${car.price}</p>
        </div>
      ))}
    </div>
  );
};

export default CarList;
