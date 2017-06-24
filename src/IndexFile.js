'use strict'

const path = require('path');
const fs = require("fs")
const xml2js = require("xml2js")

/**
  <p>This class provides functions to read the index.xml file of the Doxygen XML output.</p>
  <p>After construction the  {@link IndexFile#readFile} function must be called.</p>
*/
export class IndexFile {

    constructor() {
        this.path = null
        this.classes = [ ]
    }

    /**
      Initializes the object with the contents of the index.xml file.
      @param {string} file - The path of the index.xml file.
    */
    readFile(file) {
        let self = this
        self.path = file
        return new Promise(function(resolve, reject) {
            fs.readFile(file, function(err, data) {
                if (err) {
                    reject(err)
                } else {
                    let parser = new xml2js.Parser();
                    parser.parseString(data, function (err, result) {
                        let compounds = result.doxygenindex.compound
                        for (let i = 0; i < compounds.length; ++i) {
                            let compound = compounds[i]
                            if (compound["$"].kind == "class") {
                                self.classes.push({ name: compound.name, refid: compound["$"].refid })
                            }
                        }
                        resolve()                
                    })
                }
            })
        })
    }

    getClassDocumentationFile(name) {
        let result = null
        for (let i = 0; i < this.classes.length; ++i) {
            if (this.classes[i].name == name) {
                result = path.dirname(this.path) + "/" + this.classes[i].refid + ".xml"
            }
        }
        return result
    }
}
