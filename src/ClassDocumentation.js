'use strict'

import { InheritanceRelationship } from "./InheritanceRelationship.js"
import { FunctionDocumentation } from "./FunctionDocumentation.js"
import { Parameter } from "./Parameter.js"
import { Description } from "./Description.js"
import { XMLParser } from "./XMLUtilities.js"

const fs = require("fs")

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
                    let parser = new XMLParser();
                    parser.parseString(data, function (err, result) {
                        if (err) {
                            reject(err)
                        } else {
                            let classNode = result.getFirstChild("doxygen").getFirstChild("compounddef")
                            self.name = classNode.getFirstChild("compoundname").node
                            self.briefdescription = new Description(classNode.getFirstChild("briefdescription").node)
                            self.detaileddescription = new Description(classNode.getFirstChild("detaileddescription").node)
                            let baseNode = classNode.getFirstChild("basecompoundref")
                            if (baseNode != null) {
                                self.baseclasses.push(new InheritanceRelationship(baseNode.node._))
                            }
                            let sectionNodes = classNode.getChildren("sectiondef")
                            for (let i = 0; i < sectionNodes.length; ++i) {
                                let sectionNode = sectionNodes[i]
                                if (sectionNode.getAttribute("kind") == "public-func") {
                                    let memberNodes = sectionNode.getChildren("memberdef")
                                    for (let j = 0; j < memberNodes.length; ++j) {
                                        let memberNode = memberNodes[j]
                                        let newFunctionDocumentation = new FunctionDocumentation(
                                            memberNode.getFirstChild("name").node,
                                            new Description(memberNode.getFirstChild("type").node),
                                            memberNode.getAttribute("prot"),
                                            new Description(memberNode.getFirstChild("briefdescription").node),
                                            new Description(memberNode.getFirstChild("detaileddescription").node))
                                        let paramdef = memberNode.node.param
                                        if (paramdef) {
                                            for (let k = 0; k < paramdef.length; ++k) {
                                                newFunctionDocumentation.parameters.push(new Parameter(paramdef[k].type[0], paramdef[k].declname[0]))
                                            }
                                        }
                                        self.functions.push(newFunctionDocumentation)
                                    }
                                }
                            }
                            resolve()  
                        }
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
