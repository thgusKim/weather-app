import React from 'react'
import { Button } from 'react-bootstrap';

const WeatherButton = ({ cities, setCity, selectedCity }) => {
  return (
    <div>
      <Button
        onClick={() => setCity("")}
        className="button"
        variant={selectedCity == "" ? "secondary" : "light"}
      >
        Current Location
      </Button>

      {cities.map((item) => (
        <Button
          onClick={() => setCity(item)}
          className="button"
          variant={selectedCity == item ? "secondary" : "light"}
        >
          {item}
        </Button>
      ))}
    </div>
  );
};

export default WeatherButton