'use strict'

/**
  An enumeration for the possible access
  specifiers.
  @readonly
  @enum {number}
*/
var Accessibility = {
    /** private access specifier */
    ePrivate: 0,
    /** protected access specifier */
    eProtected: 2,
    /** public access specifier */
    ePublic: 4,

    toString: function(level) {
        switch (level) {
            case Accessibility.ePrivate:
                return "private"
            case Accessibility.eProtected:
                return "protected"
            case Accessibility.ePublic:
                return "public"
        }
    }
}

export { Accessibility }
