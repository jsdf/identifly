# Identifly app

This is the source of [Identifly](https://identiflyapp.com/), an app for identifying dragonflies and damselflies. It's built with React Native and [Expo](https://expo.io). It's released under the MIT License, so feel free to use this code however you like (including as a starting point for your own app).


  <div id="screens" style="overflow-x: scroll; margin-top: 0px; margin-bottom: 20px">
    <div style="text-align: center">
      <img height="348" src="https://identiflyapp.com/screen696x696-2.jpeg" />
      <img height="348" src="https://identiflyapp.com/screen696x696-3.jpeg" />
      <img height="348" src="https://identiflyapp.com/screen696x696.jpeg" />
      <img height="348" src="https://identiflyapp.com/screen696x696-4.jpeg" />
    </div>
  </div>

## Build/run instructions

Install [Expo XDE](https://expo.io/tools), (known compatible version: [v2.24.4](https://github.com/expo/xde/releases/tag/v2.24.4)), then:

```bash
git clone https://github.com/jsdf/identifly.git
cd identifly
npm install

npm run build-content
npm run build-content-indexes

xde # open this directory using Expo XDE
```

Launch the simulator from the 'device' menu in XDE.

## Customizing

Metadata for the app can be configured in `app.json`

### Species content

Content for each species is defined in folders in `content-source/species`. Each species has

- a `content.txt` file, which contains the text content describing the species
- a `metadata.aml` file (written in [Archie Markup Language](http://archieml.org/)) which contains metadata used to find the species by colour or name, as well as referencing images of the species.
- images of the species

Running `npm run build-content` will output `species.json` into the `content` directory, and will also copy the image files and output an `assets.js` file which will cause the images to be packaged with the app.

Running `npm run build-content-indexes` will output `speciesByColour.json` and `coloursSorted.json` which are used in the app for looking up species by colour.

