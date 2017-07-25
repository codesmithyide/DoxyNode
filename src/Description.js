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
                if (this.description.para[0]["_"] == null) {
                    result += "<p>" + this.trim(this.description.para[0]) + "</p>"
                } else {
                    result += "<p>" + this.trim(this.description.para[0]["_"]) + "</p>"
                }
            }
        }
        return result
    }

    trim(str) {
        let result = str.trim()
        if (result.charAt(result.length-1) == '\n') {
            result = result.slice(0, -1)
            result = result.trim()
        }
        return result
    }

}

export { Description }
