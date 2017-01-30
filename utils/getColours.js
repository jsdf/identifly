import firstCap from '../utils/firstCap';

import simpleMemoize from './simpleMemoize';

function getColours(speciesByColour) {
  return Object.keys(speciesByColour)
    .sort((a, b) => a < b ? -1 : 1) // alphabetical
    .map(colour => {
      const colours = colour.split('+');
      return {
        id: colour,
        label: colours.map(firstCap).join(' & '),
        colours,
      };
    });
}

export default simpleMemoize(getColours);
