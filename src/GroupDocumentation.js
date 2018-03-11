'use strict'

const fs = require("fs")
const xml2js = require("xml2js")

/**
  <p>This class stores the details of a group created
     by the \defgroup doxygen command.</p>
*/
class GroupDocumentation {

    constructor() {
        this.name = null
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
                        self.name = result.doxygen.compounddef[0].compoundname[0]
                        resolve()
                    })
                }
            })
        })
    }
}

export { GroupDocumentation }
