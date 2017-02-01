import getSpeciesByColour from '../utils/getSpeciesByColour';
import getColours from '../utils/getColours';

const allSpecies = require('../content/species.json');
const fs = require('fs');
const path = require('path');

const speciesByColour = getSpeciesByColour(allSpecies);
const coloursSorted = getColours(speciesByColour);

fs.writeFileSync(
  path.resolve(__dirname, '../content/speciesByColour.json'),
  JSON.stringify(speciesByColour, null, 2),
);
fs.writeFileSync(
  path.resolve(__dirname, '../content/coloursSorted.json'),
  JSON.stringify(coloursSorted, null, 2),
);
