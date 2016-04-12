jcons
=========

jcons generates a json file with svg strings from your .svg files. This allows you to use inline svg icons in your (Javascript) webapplication. Usefull for frameworks like React.

## Installation

`npm install jcons --save`

## Configuration

Jcons reads the configuration from a `jconfig.json` in your project root

jconfig.json:
```
   "source": {
        "dir": "svg/"
    },
    "output": {
        "dir": "output/",
        "fileName": "jcons",
        "spaces": 4
    }
```

## Usage

In this example we use gulp to generate our jcons

```
    var gulp = require('gulp');
    var jcons = require('jcons');
    
    // task that generates the icon json
    gulp.task('jcons', function() {
        return jcons.generateJcons();
    });
    
    // watch for icon updates
    gulp.task('watch', function() {
        gulp.watch('src/icons/*', ['jcons']);
    });
    
    // run jcons task
    gulp.task('default', ['jcons']);

```


## Release History

* 0.0.3 Gulp support
* 0.0.1 Initial release
