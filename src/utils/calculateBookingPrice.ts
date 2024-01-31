import { Planet } from "../types/Booking.types";

export const calculateBookingPrice = (
  selectedDestination: Planet,
  passengers: number
): number => {
  const distance = selectedDestination.isPlanet
    ? (selectedDestination.perihelion + selectedDestination.aphelion) / 2
    : selectedDestination.aroundPlanet
    ? (selectedDestination.aroundPlanet.rel.perihelion +
        selectedDestination.aroundPlanet.rel.aphelion) /
      2
    : 0;

  const temperature = Math.max(selectedDestination.avgTemp, 50);
  const moonsCost =
    (selectedDestination.moons ? selectedDestination.moons.length : 0) * 0.072;
  const baseCost = (distance * temperature * (1 + moonsCost)) / 100000000;

  return baseCost * passengers;
};
