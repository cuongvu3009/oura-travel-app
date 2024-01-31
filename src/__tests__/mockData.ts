export const mockData = {
  data: {
    bodies: [
      {
        englishName: "Earth",
        isPlanet: true,
        perihelion: 147.1,
        aphelion: 152.1,
        avgTemp: 15,
        moons: [{}, {}],
      },
      {
        englishName: "Mars",
        isPlanet: false,
        aroundPlanet: {
          rel: {
            perihelion: 147.1,
            aphelion: 152.1,
          },
        },
        avgTemp: -10,
      },
    ],
  },
};
