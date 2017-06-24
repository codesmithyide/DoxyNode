'use strict'

var fs = require("fs")
var xml2js = require("xml2js")

/**
  <p>This class provides functions to read the index.xml file of the Doxygen XML output.</p>
  <p>After construction the  {@link IndexFile#readFile} function must be called.</p>
*/
export class IndexFile {

    constructor() {
    }

    /**
      Initializes the object with the contents of the index.xml file.
      @param {string} file - The path of the index.xml file.
    */
    readFile(file, callback) {
        return new Promise(function(resolve, reject) {
            fs.readFile(file, function(err, data) {
                let parser = new xml2js.Parser();
                parser.parseString(data, function (err, result) {
                    resolve(data)
                })
            })
        })
    }
}
