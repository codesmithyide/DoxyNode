'use strict'

const fs = require("fs")
const xml2js = require("xml2js")

export class ClassDocumentation {

    constructor() {
        this.briefdescription = null
        this.detaileddescription = null
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
                        self.briefdescription = result.doxygen.compounddef[0].briefdescription
                        self.detaileddescription = result.doxygen.compounddef[0].detaileddescription
                        resolve()                
                    })
                }
            })
        })
    }

}
