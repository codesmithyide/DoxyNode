'use strict'

const xml2js = require("xml2js")

class XMLParser {

    constructor() {
        this.parser = new xml2js.Parser();
    }

    parseString(str, cb) {
        this.parser.parseString(str, function (err, result) {
            let resultNode = result
            if (!err) {
                resultNode = new XMLNode(result)
            }
            cb(err, resultNode)
        })
    }

}

class XMLNode {

    constructor(node) {
        this.node = node
    }

    getFirstChild(name) {
        if (this.node) {
            if (Array.isArray(this.node)) {

            } else {
                if (this.node[name]) {
                    if (Array.isArray(this.node[name])) {
                        return new XMLNode(this.node[name][0])
                    } else {
                        return new XMLNode(this.node[name])
                    }
                }
            }
        }
        return null
    }

}

export { XMLParser }
export { XMLNode }
