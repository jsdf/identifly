#!/usr/bin/env node
const fs = require('fs');
function readJSON(name) {
  return JSON.parse(fs.readFileSync(name, {encoding: 'utf8'}));
}

function writeJSON(name, data) {
  fs.writeFileSync(name, JSON.stringify(data, null, 2));
}

const appJson = readJSON('./app.json');
Object.assign(appJson.expo || {}, {
  name: 'Identifly-OpenSource',
  description: '[description goes here]',
  slug: 'identifly-opensource',
  icon: './assets/icon.png',
  splash: Object.assign(appJson.expo.splash || {}, {
    image: './assets/splash.png',
  }),
  ios: Object.assign(appJson.expo.ios || {}, {
    bundleIdentifier: 'com.yourapp.identifly-os',
  }),
  android: Object.assign(appJson.expo.android || {}, {
    package: 'com.yourapp.identifly-os',
  }),
});

writeJSON('./app.json', appJson);

const packageJson = readJSON('./package.json');
Object.assign(packageJson, {
  name: 'identifly-opensource',
  description: '[description goes here]',
  scripts: Object.assign(packageJson.scripts || {}, {
    'build-content': 'node scripts/build-content.js',
    'build-content-indexes':
      './node_modules/.bin/babel-node scripts/build-content-indexes.js',
  }),

  devDependencies: Object.assign(packageJson.devDependencies || {}, {
    archieml: '^0.4.2',
    'babel-cli': '*',
  }),
});

writeJSON('./package.json', packageJson);
