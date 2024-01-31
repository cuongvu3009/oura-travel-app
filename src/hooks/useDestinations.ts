import { useEffect, useState } from "react";

import { Planet } from "../types/Booking.types";
import axios from "axios";

const API_URL = "https://api.le-systeme-solaire.net/rest/bodies/";

export const useDestinations = () => {
  const [destinations, setDestinations] = useState<Planet[]>([]);

  const fetchDestinations = async () => {
    try {
      const response = await axios.get(API_URL);
      const planets = response.data.bodies.filter(
        (body: any) => body.isPlanet
      ) as Planet[];
      return planets;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchDestinationsData = async () => {
      const planets = await fetchDestinations();
      setDestinations(planets);
    };

    fetchDestinationsData();
  }, []);

  return { destinations, fetchDestinations };
};
