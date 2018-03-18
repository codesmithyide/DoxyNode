'use strict'

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

export { XMLNode }
