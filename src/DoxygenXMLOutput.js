'use strict'

import { IndexFile } from "./IndexFile.js"
import { ClassDocumentation } from "./ClassDocumentation.js"

/**
  <p>This class provides functions to read the XML output produced
     by Doxygen.</p>
  <p>After construction the  {@link DoxygenXMLOutput#initialize} function must be called.</p>
*/
export class DoxygenXMLOutput {

    constructor() {
        this.indexFile = new IndexFile()
    }

    /**
      Initializes the object.
      @param {string} path - The path of the directory where
        the XML output was generated.
    */
    initialize(path) {
        let indexFilePath = path + "/index.xml"
        return this.indexFile.readFile(indexFilePath)
    }

    /**
      Gets the list of classes for which documentation exists.
    */
    getListOfClasses() {
        let result = [ ]
        for (let i = 0; i < this.indexFile.classes.length; ++i) {
            result.push(this.indexFile.classes[i].name)
        }
        return result
    }

    /**
      Reads the file containing the documentation for a given class
      and returns a promise.
      @return {Promise}
    */
    readClassDocumentation(name) {
        let self = this
        let classDocumentation = new ClassDocumentation()
        return new Promise(function(resolve, reject) {
            classDocumentation.readFile(self.indexFile.getClassDocumentationFile(name))
                .then(function() {
                    resolve(classDocumentation)
                })
        })
    }

}
