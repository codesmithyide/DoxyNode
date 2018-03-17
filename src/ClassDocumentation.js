'use strict'

import { InheritanceRelationship } from "./InheritanceRelationship.js"
import { FunctionDocumentation } from "./FunctionDocumentation.js"
import { Parameter } from "./Parameter.js"
import { Description } from "./Description.js"

const fs = require("fs")
const xml2js = require("xml2js")

/**
  <p>This class provides functions to read the
     documentation for a class.</p>
*/
export class ClassDocumentation {

    constructor() {
        this.name = null
        this.baseclasses = [ ]
        this.briefdescription = null
        this.detaileddescription = null
        this.functions = [ ]
    }

    /**
      Reads the contents of a class documentation file and initialize
      the object.
      @param {string} path - The path of the file that contains the 
        documentation for the class.
    */
    readFile(file) {
        let self = this
        return new Promise(function(resolve, reject) {
            fs.readFile(file, function(err, data) {
                if (err) {
                    reject(err)
                } else {
                    let parser = new xml2js.Parser();
                    parser.parseString(data, function (err, result) {
                        self.name = result.doxygen.compounddef[0].compoundname[0]
                        self.briefdescription = new Description(result.doxygen.compounddef[0].briefdescription)
                        self.detaileddescription = new Description(result.doxygen.compounddef[0].detaileddescription)
                        if (result.doxygen.compounddef[0].basecompoundref != null) {
                            self.baseclasses.push(new InheritanceRelationship(result.doxygen.compounddef[0].basecompoundref[0]._))
                        }
                        let sectiondef = result.doxygen.compounddef[0].sectiondef
                        if (sectiondef) {
                            for (let i = 0; i < sectiondef.length; ++i) {
                                if (sectiondef[i]['$'].kind == "public-func") {
                                    let memberdef = sectiondef[i].memberdef
                                    for (let j = 0; j < memberdef.length; ++j) {
                                        let newFunctionDocumentation = new FunctionDocumentation(
                                            memberdef[j].name[0],
                                            new Description(memberdef[j].type[0]),
                                            memberdef[j]['$'].prot,
                                            new Description(memberdef[j].briefdescription[0]),
                                            new Description(memberdef[j].detaileddescription[0]))
                                        let paramdef = memberdef[j].param
                                        if (paramdef) {
                                            for (let k = 0; k < paramdef.length; ++k) {
                                                newFunctionDocumentation.parameters.push(new Parameter(paramdef[k].type[0], paramdef[k].declname[0]))
                                            }
                                        }
                                        self.functions.push(newFunctionDocumentation)
                                    }
                                }
                            }
                        }
                        resolve()  
                    })
                }
            })
        })
    }

    getBaseClasses() {
        let result = [ ]
        for (let i = 0; i < this.baseclasses.length; ++i) {
            result.push(this.baseclasses[i])
        }
        return result
    }

    getListOfFunctions(accessibility = null) {
        let result = [ ]
        for (let i = 0; i < this.functions.length; ++i) {
            if ((accessibility == null) || (this.functions[i].accessibility == accessibility)) {
                result.push(this.functions[i])
            }
        }
        return result
    }

}
