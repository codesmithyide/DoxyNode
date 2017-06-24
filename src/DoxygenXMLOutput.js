'use strict'

import { IndexFile } from "./IndexFile.js"

/**
  <p>This class provides functions to read the XML output produced
     by Doxygen.</p>
  <p>After construction the  {@link DoxygenXMLOutput#initialize} function must be called.</p>
*/
export class DoxygenXMLOutput {

    constructor() {
    }

    /**
      Initializes the object.
      @param {string} path - The path of the directory where
        the XML output was generated.
    */
    initialize(path) {
        let indexFilePath = path + "/index.xml"
        let indexFile = new IndexFile()
        indexFile.readFile(indexFilePath)
    }

}
