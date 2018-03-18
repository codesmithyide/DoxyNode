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
        let children = this.node
        if (children) {
            let namedChildren = children[name]
            if (namedChildren && (namedChildren.length > 0)) {
                return new XMLNode(namedChildren[0])
            }
        }
        return null
    }

}

export { XMLParser }
export { XMLNode }
