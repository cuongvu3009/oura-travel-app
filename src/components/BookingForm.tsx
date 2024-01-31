import React, { useEffect, useState } from "react";

import { Planet } from "../types/Booking.types";
import axios from "axios";
import styles from "./BookingForm.module.css";

const API_URL = "https://api.le-systeme-solaire.net/rest/bodies/";

const BookingForm: React.FC = () => {
  const [destinations, setDestinations] = useState<Planet[]>([]);
  const [selectedDestination, setSelectedDestination] = useState<Planet | null>(
    null
  );
  const [passengers, setPassengers] = useState(1);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      const response = await axios.get(API_URL);
      // console.log(response);

      const planets = response.data.bodies.filter((body: any) => body.isPlanet);
      setDestinations(planets);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const calculatePrice = () => {
    if (!selectedDestination) return;

    const distance = selectedDestination.isPlanet
      ? (selectedDestination.perihelion + selectedDestination.aphelion) / 2
      : selectedDestination.aroundPlanet
      ? (selectedDestination.aroundPlanet.rel.perihelion +
          selectedDestination.aroundPlanet.rel.aphelion) /
        2
      : 0;

    const temperature = Math.max(selectedDestination.avgTemp, 50);
    const moonsCost =
      (selectedDestination.moons ? selectedDestination.moons.length : 0) *
      0.072;
    const baseCost = (distance * temperature * (1 + moonsCost)) / 100000000;

    setTotalCost(baseCost * passengers);
  };

  const handleDestinationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = destinations.find(
      (dest) => dest.englishName === e.target.value
    );
    setSelectedDestination(selected || null);
  };

  const handlePassengersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassengers(parseInt(e.target.value, 10) || 1);
  };

  return (
    <div className={styles["booking-form-container"]}>
      <h1>Interplanetary Travel Agency</h1>
      <div className={styles["form-group"]}>
        <label htmlFor="destination">Select Destination:</label>
        <select id="destination" onChange={handleDestinationChange}>
          <option value="">Choose a destination</option>
          {destinations.map((dest) => (
            <option key={dest.englishName} value={dest.englishName}>
              {dest.englishName}
            </option>
          ))}
        </select>
      </div>
      <div className={styles["form-group"]}>
        <label htmlFor="passengers">Number of Passengers:</label>
        <input
          id="passengers"
          type="number"
          min="1"
          value={passengers}
          onChange={handlePassengersChange}
        />
      </div>
      <button className={styles["calculate-button"]} onClick={calculatePrice}>
        Calculate Price
      </button>
      {totalCost > 0 ? (
        <div className={styles["result"]}>
          <h2>Total Cost: {totalCost.toFixed(2)}€</h2>
        </div>
      ) : (
        <div className={styles["result"]}>
          <h3>
            You cannot travel to this destination, please choose another planet
          </h3>
        </div>
      )}
    </div>
  );
};

export default BookingForm;
