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
        let result = null
        if (this.node) {
            if (this.node[name]) {
                if (Array.isArray(this.node[name])) {
                    result = new XMLNode(this.node[name][0])
                } else {
                    result = new XMLNode(this.node[name])
                }
            }
        }
        return result
    }

    getChildren(name) {
        let result = [ ]
        if (this.node) {
            let namedNode = this.node[name]
            if (namedNode) {
                for (let i = 0; i < namedNode.length; ++i) {
                    result.push(new XMLNode(namedNode[i]))
                }
            }
        }
        return result
    }

    getAttribute(name) {
        let result = null
        if (this.node) {
            result = this.node['$'][name]
        }
        return result
    }

}

export { XMLParser }
export { XMLNode }
