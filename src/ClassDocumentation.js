'use strict'

import { FunctionDocumentation } from "./FunctionDocumentation.js"

const fs = require("fs")
const xml2js = require("xml2js")

export class ClassDocumentation {

    constructor() {
        this.name = null
        this.briefdescription = null
        this.detaileddescription = null
        this.functions = [ ]
    }

    readFile(file) {
        let self = this
        return new Promise(function(resolve, reject) {
            fs.readFile(file, function(err, data) {
                if (err) {
                    reject(err)
                } else {
                    let parser = new xml2js.Parser();
                    parser.parseString(data, function (err, result) {
                        self.name = result.doxygen.compounddef[0].compoundname
                        self.briefdescription = result.doxygen.compounddef[0].briefdescription
                        self.detaileddescription = result.doxygen.compounddef[0].detaileddescription
                        let sectiondef = result.doxygen.compounddef[0].sectiondef
                        if (sectiondef) {
                            for (let i = 0; i < sectiondef.length; ++i) {
                                if (sectiondef[i]['$'].kind == "public-func") {
                                    let memberdef = sectiondef[i].memberdef
                                    for (let j = 0; j < memberdef.length; ++j) {
                                        self.functions.push(new FunctionDocumentation(memberdef[j].name[0]))
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

    getListOfFunctions() {
        let result = [ ]
        for (let i = 0; i < this.functions.length; ++i) {
            result.push(this.functions[i])
        }
        return result
    }

}
