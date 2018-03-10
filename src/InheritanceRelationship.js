'use strict'

/**
  <p>This class stores the details of
     an inheritance relationship.</p>
*/
class InheritanceRelationship {

    constructor(baseclassname) {
        this.baseclassname = baseclassname
    }

    getBaseClassName() {
        return this.baseclassname
    }
}

export { InheritanceRelationship }
