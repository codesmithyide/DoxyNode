'use strict'

import { Accessibility } from "./Accessibility.js"

/**
  <p>This class stores the documentation for a
     function.</p>
*/
class FunctionDocumentation {

    /**
      @param {string} name - The name of the function.
      @param {Accessibility|string} accessibility - The
        accessibility of the function. Either one of the
        Accessibility enum values or one of the strings:
        "public", "private" or "protected".
    */
    constructor(name, accessibility) {
        this.name = name
        this.accessibility = this.toAccessibility(accessibility)
    }

    toAccessibility(accessibility) {
        if (typeof accessibility === "Accessibility") {
            return accessibility
        } else if (accessibility == "public") {
            return Accessibility.ePublic
        } else if (accessibility == "protected") {
            return Accessibility.eProtected
        } else if (accessibility == "private") {
            return Accessibility.ePrivate
        }
    }

}

export { FunctionDocumentation }