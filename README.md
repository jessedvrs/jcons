jcons
=========

jcons allows you to generate inline svg strings from your .svg files. This allows you to use inline svg icons in your (Javascript) webapplication.

## Installation

`npm install jcons --save`

## Configuration

Jcons reads the configuration from a `jconfig.json` in your project root
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

## Release History

* 0.1.0 Initial release
