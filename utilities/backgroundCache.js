import {
  Image,
} from 'react-native';
import {
  Asset,
} from 'exponent';

import queue from 'async/queue';

const CONCURRENCY = 6;

export default function backgroundCache({images = []}) {
  const q = queue(({image}, done) => {
    cacheImage(image)
      .then(done)
      .catch(e => {
        console.warn(
          'There was an error caching deferred assets.'
        );
        console.log(e.message);
      });
  }, CONCURRENCY);

  q.push(images.map(image => ({image})));
}

function cacheImage(image) {
  if (typeof image === 'string') {
    return Image.prefetch(image);
  } else {
    return Asset.fromModule(image).downloadAsync();
  }
}
