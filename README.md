# Identifly app

This is the source of [Identifly](https://identiflyapp.com/), an app for identifying dragonflies and damselflies. It's built with React Native and [Expo](https://expo.io).

To run the app:

Install [Expo XDE](https://expo.io/tools), then:

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

Metadata for the app can be configured in `exp.json`

### Species content

Content for each species is defined in folders in `content-source/species`. Each species has

- a `content.txt` file, which contains the text content describing the species
- a `metadata.aml` file (written in [Archie Markup Language](http://archieml.org/)) which contains metadata used to find the species by colour or name, as well as referencing images of the species.
- images of the species

Running `npm run build-content` will output `species.json` into the `content` directory, and will also copy the image files and output an `assets.js` file which will cause the images to be packaged with the app.

Running `npm run build-content-indexes` will output `speciesByColour.json` and `coloursSorted.json` which are used in the app for looking up species by colour.

