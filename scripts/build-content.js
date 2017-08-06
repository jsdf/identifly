var fs = require('fs');
var path = require('path');
var spawnSync = require('child_process').spawnSync;
var archieml = require('archieml');
var glob = require('glob');

var assetMap = {};
var speciesPath = 'content-source/species';
var speciesData = glob.sync(`${speciesPath}/*/`).map(dirname => {
  var data = archieml.load(loadFile(dirname, 'metadata.aml'));
  if (data.images) {
    var inputImages = data.images;
    outputImages = [];
    inputImages.forEach(image => {
      var inputFilepath = path.join(dirname, image.filename);
      var outputFilename = `${data.species}/${image.filename}`
        .replace(/\//g, '__')
        .replace(/[^\.\w]/g, '_');
      outputImages.push(Object.assign({}, image, {filename: inputFilepath}));
      assetMap[inputFilepath] = outputFilename;
    });

    data.images = outputImages;
  }
  data.content = loadFile(dirname, 'content.txt');
  return data;
});

spawnSync('mkdir', ['-p', 'content']);
Object.keys(assetMap).forEach(inputFilepath => {
  const outpath = path.join('content', assetMap[inputFilepath]);
  spawnSync('cp', [inputFilepath, outpath]);
});

var assetManifest = `module.exports = {
  ${Object.keys(assetMap)
    .map(
      inputFilepath =>
        `${JSON.stringify(inputFilepath)}: require(${JSON.stringify(
          './' + assetMap[inputFilepath]
        )}),`
    )
    .join('\n')}
};`;

fs.writeFileSync('content/species.json', JSON.stringify(speciesData, null, 2));
fs.writeFileSync('content/assets.js', assetManifest);

function loadFile(dirname, filename) {
  return fs.readFileSync(path.join(dirname, filename), {encoding: 'utf8'});
}
