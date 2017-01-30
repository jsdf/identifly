/*
type SpeciesByColour = {
  [key: Colour]: Array<{speciesIndex: number, weight: number}>,
}
 */

import simpleMemoize from './simpleMemoize';

function getSpeciesByColour(allSpecies) /*: SpeciesByColour */ {
  const speciesByColour = {};
  for (var si = 0; si < allSpecies.length; si++) {
    const s = allSpecies[si];

    const coloursWeights = {};

    for (let w of s.weights) {
      coloursWeights[w.colour] = w.weight;
    }

    for (let image of s.images) {
      if (image.colours[0]) {
        // don't override existing colour weights
        if (coloursWeights[image.colours[0]] == null) {
          coloursWeights[image.colours[0]] = Infinity;
        }
      }
    }

    for (let c of Object.keys(coloursWeights)) {
      if (speciesByColour[c] == null) {
        speciesByColour[c] = [];
      }
      speciesByColour[c].push({
        speciesIndex: si,
        weight: coloursWeights[c],
      });
    }
  }
  return speciesByColour;
}

export default simpleMemoize(getSpeciesByColour);
