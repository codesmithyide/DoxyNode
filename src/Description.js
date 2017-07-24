'use strict'

/**
  <p>This class stores the contents of a brief or
     detailed description.</p>
*/
class Description {

    constructor(description) {
        this.description = description
    }

    toHTML() {
        let result = ""
        if (this.description.para) {
            for (let i = 0; i < this.description.para.length; i++) {
                result += "<p>" + this.description.para[0] + "</p>"
            }
        }
        return result
    }
}

export { Description }
