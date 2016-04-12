'use strict'

var fs = require('fs');
var path = require('path');
var svgo = require('svgo');
var jsonfile = require('jsonfile');
var mkdirp = require('mkdirp');
var svgoGenerator = new svgo();

// read jconfig.json
var config = JSON.parse(fs.readFileSync('jconfig.json', 'utf8'));

// set config vars
var source = config.source || {};
var sourceDir = source.dir || 'src/';
var output = config.output || {};
var outputDir = output.dir || 'dist/';
var outputSpaces = output.spaces || 2;
var outputName = output.fileName || 'output';

module.exports = {
    generateJcons: function() {
        fs.readdir(sourceDir, function(error, files) {
            if (error) throw error;

            var generateOutputFile = function(outputObject) {
                console.log('jcons: completed ' + outputDir + outputName + '.json');

                mkdirp(outputDir, function(error) {
                    if (error) throw error;

                    jsonfile.writeFile(outputDir + outputName + '.json', outputObject, { spaces: outputSpaces }, function (error) {
                        if (error) throw error;
                    });
                });
            };

            var iconsObject = {};
            var totalIcons = files.length;
            var currentIcon = 0;

            files.forEach(function(fileName, index) {

                // skip file when the extension doesn't match
                if (!path.extname(fileName) === '.svg') {
                    totalIcons --;
                    return;
                }

                // remember icon name without extension
                var iconKey = path.basename(filename, '.svg');

                // read each file
                fs.readFile(path.resolve(sourceDir, fileName), 'utf8', function(error, svgData) {
                    if (error) throw error;

                    // optimize svg file
                    svgoGenerator.optimize(svgData, function(result) {
                        var svgString = result.data;

                        // add svg string to icons object
                        iconsObject[iconKey] = svgString;

                        // increment current icon to keep track of progress
                        currentIcon ++;
                        console.log('jcons: generated [' + currentIcon + '/' + totalIcons + '] ' + iconKey);

                        if (currentIcon === totalIcons) {
                            generateOutputFile(iconsObject);
                        }
                    });
                });
            });
        });
    }
};
