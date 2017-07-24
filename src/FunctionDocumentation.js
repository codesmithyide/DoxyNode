'use strict'

import { Accessibility } from "./Accessibility.js"

/**
  <p>This class stores the documentation for a
     function.</p>
*/
class FunctionDocumentation {

    /**
      @param {string} name - The name of the function.
      @paran {string} returnType - The return type of the function.
      @param {Accessibility|string} accessibility - The
        accessibility of the function. Either one of the
        Accessibility enum values or one of the strings:
        "public", "private" or "protected".
    */
    constructor(name, returnType, accessibility) {
        this.name = name
        this.returnType = returnType
        this.accessibility = FunctionDocumentation.toAccessibility(accessibility)
    }

    static toAccessibility(accessibility) {
        if ((accessibility == Accessibility.ePrivate) ||
            (accessibility == Accessibility.eProtected) ||
            (accessibility == Accessibility.ePublic)) {
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
