export const CURRENT_STATION = "Elephant & Castle";

export const stations = [
  "Elephant & Castle",
  "Borough",
  "London Bridge",
  "Bank",
  "Moorgate",
  "Old Street",
  "Angel",
  "King's Cross St. Pancras",
  "Euston",
  "Warren Street",
  "Oxford Circus",
  "Tottenham Court Road",
  "Leicester Square",
  "Charing Cross",
  "Embankment",
  "Waterloo",
  "Kennington",
  "Stockwell",
  "Clapham North",
  "Clapham Common",
];

export const destinationStations = stations.filter((s) => s !== CURRENT_STATION);

export const journeyTimesFromElephantAndCastle = {
  Borough: 2,
  "London Bridge": 4,
  Bank: 6,
  Moorgate: 8,
  "Old Street": 10,
  Angel: 12,
  "King's Cross St. Pancras": 15,
  Euston: 17,
  "Warren Street": 19,
  "Oxford Circus": 21,
  "Tottenham Court Road": 22,
  "Leicester Square": 9,
  "Charing Cross": 7,
  Embankment: 6,
  Waterloo: 3,
  Kennington: 3,
  Stockwell: 5,
  "Clapham North": 7,
  "Clapham Common": 8,
};

export function getJourneyMinutes(destination) {
  return journeyTimesFromElephantAndCastle[destination] ?? 10;
}
