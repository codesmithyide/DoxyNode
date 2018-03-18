(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("fs"), require("xml2js"), require("path"));
	else if(typeof define === 'function' && define.amd)
		define(["fs", "xml2js", "path"], factory);
	else if(typeof exports === 'object')
		exports["CodeSmithyDoxyNode"] = factory(require("fs"), require("xml2js"), require("path"));
	else
		root["CodeSmithyDoxyNode"] = factory(root["fs"], root["xml2js"], root["path"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_10__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


const path = __webpack_require__(10);
const fs = __webpack_require__(0)
const xml2js = __webpack_require__(1)

/**
  <p>This class provides functions to read the index.xml file of the Doxygen XML output.</p>
  <p>After construction the  {@link IndexFile#readFile} function must be called.</p>
*/
class IndexFile {

    constructor() {
        this.path = null
        this.classes = [ ]
        this.groups = [ ]
    }

    /**
      Initializes the object with the contents of the index.xml file.
      @param {string} file - The path of the index.xml file.
    */
    readFile(file) {
        let self = this
        self.path = file
        return new Promise(function(resolve, reject) {
            fs.readFile(file, function(err, data) {
                if (err) {
                    reject(err)
                } else {
                    let parser = new xml2js.Parser();
                    parser.parseString(data, function (err, result) {
                        let compounds = result.doxygenindex.compound
                        for (let i = 0; i < compounds.length; ++i) {
                            let compound = compounds[i]
                            if (compound["$"].kind == "class") {
                                self.classes.push({ name: compound.name[0], refid: compound["$"].refid })
                            } else if (compound["$"].kind == "group") {
                                self.groups.push({ name: compound.name[0], refid: compound["$"].refid })
                            }
                        }
                        resolve()                
                    })
                }
            })
        })
    }

    /**
      Gets the path of the file that contains the documentation
      for a given class.
      @param {string} name - The name of the class we want the documentation
        for.
      @return {string} The path to the file.
    */
    getClassDocumentationFile(name) {
        let result = null
        for (let i = 0; i < this.classes.length; ++i) {
            if (this.classes[i].name == name) {
                result = path.dirname(this.path) + "/" + this.classes[i].refid + ".xml"
            }
        }
        return result
    }

    getGroupDocumentationFile(name) {
        let result = null
        for (let i = 0; i < this.groups.length; ++i) {
            if (this.groups[i].name == name) {
                result = path.dirname(this.path) + "/" + this.groups[i].refid + ".xml"
            }
        }
        return result
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = IndexFile;



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__InheritanceRelationship_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__FunctionDocumentation_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Parameter_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Description_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__XMLUtilities_js__ = __webpack_require__(13);








const fs = __webpack_require__(0)

/**
  <p>This class provides functions to read the
     documentation for a class.</p>
*/
class ClassDocumentation {

    constructor() {
        this.name = null
        this.baseclasses = [ ]
        this.briefdescription = null
        this.detaileddescription = null
        this.functions = [ ]
    }

    /**
      Reads the contents of a class documentation file and initialize
      the object.
      @param {string} path - The path of the file that contains the 
        documentation for the class.
    */
    readFile(file) {
        let self = this
        return new Promise(function(resolve, reject) {
            fs.readFile(file, function(err, data) {
                if (err) {
                    reject(err)
                } else {
                    let parser = new __WEBPACK_IMPORTED_MODULE_4__XMLUtilities_js__["a" /* XMLParser */]();
                    parser.parseString(data, function (err, result) {
                        if (err) {
                            reject(err)
                        } else {
                            let classNode = result.getFirstChild("doxygen").getFirstChild("compounddef")
                            self.name = classNode.getFirstChild("compoundname").node
                            self.briefdescription = new __WEBPACK_IMPORTED_MODULE_3__Description_js__["a" /* Description */](classNode.getFirstChild("briefdescription").node)
                            self.detaileddescription = new __WEBPACK_IMPORTED_MODULE_3__Description_js__["a" /* Description */](classNode.getFirstChild("detaileddescription").node)
                            let baseNode = classNode.getFirstChild("basecompoundref")
                            if (baseNode != null) {
                                self.baseclasses.push(new __WEBPACK_IMPORTED_MODULE_0__InheritanceRelationship_js__["a" /* InheritanceRelationship */](baseNode.node._))
                            }
                            let sectionNodes = classNode.getChildren("sectiondef")
                            for (let i = 0; i < sectionNodes.length; ++i) {
                                let sectionNode = sectionNodes[i]
                                if (sectionNode.getAttribute("kind") == "public-func") {
                                    let memberNodes = sectionNode.getChildren("memberdef")
                                    for (let j = 0; j < memberNodes.length; ++j) {
                                        let memberNode = memberNodes[j]
                                        let newFunctionDocumentation = new __WEBPACK_IMPORTED_MODULE_1__FunctionDocumentation_js__["a" /* FunctionDocumentation */](
                                            memberNode.getFirstChild("name").node,
                                            new __WEBPACK_IMPORTED_MODULE_3__Description_js__["a" /* Description */](memberNode.getFirstChild("type").node),
                                            memberNode.getAttribute("prot"),
                                            new __WEBPACK_IMPORTED_MODULE_3__Description_js__["a" /* Description */](memberNode.getFirstChild("briefdescription").node),
                                            new __WEBPACK_IMPORTED_MODULE_3__Description_js__["a" /* Description */](memberNode.getFirstChild("detaileddescription").node))
                                        let paramNodes = memberNode.getChildren("param")
                                        for (let k = 0; k < paramNodes.length; ++k) {
                                            let paramNode = paramNodes[k]
                                            newFunctionDocumentation.parameters.push(
                                                new __WEBPACK_IMPORTED_MODULE_2__Parameter_js__["a" /* Parameter */](paramNode.getFirstChild("type").node, paramNode.getFirstChild("declname").node)
                                                )
                                        }
                                        self.functions.push(newFunctionDocumentation)
                                    }
                                }
                            }
                            resolve()  
                        }
                    })
                }
            })
        })
    }

    getBaseClasses() {
        let result = [ ]
        for (let i = 0; i < this.baseclasses.length; ++i) {
            result.push(this.baseclasses[i])
        }
        return result
    }

    getListOfFunctions(accessibility = null) {
        let result = [ ]
        for (let i = 0; i < this.functions.length; ++i) {
            if ((accessibility == null) || (this.functions[i].accessibility == accessibility)) {
                result.push(this.functions[i])
            }
        }
        return result
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = ClassDocumentation;



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FunctionDocumentation; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Accessibility_js__ = __webpack_require__(5);




/**
  <p>This class stores the documentation for a
     function.</p>
*/
class FunctionDocumentation {

    /**
      @param {string} name - The name of the function.
      @paran {Description} returnType - The return type of the function.
      @param {Accessibility|string} accessibility - The
        accessibility of the function. Either one of the
        Accessibility enum values or one of the strings:
        "public", "private" or "protected".
      @param {Description} briefdescription - The brief description.
      @param {Description} detaileddescription - The detailed description.
    */
    constructor(name, returnType, accessibility, briefdescription, detaileddescription) {
        this.name = name
        this.returnType = returnType
        this.parameters = [ ]
        this.accessibility = FunctionDocumentation.toAccessibility(accessibility)
        this.briefdescription = briefdescription
        this.detaileddescription = detaileddescription
    }

    static toAccessibility(accessibility) {
        if ((accessibility == __WEBPACK_IMPORTED_MODULE_0__Accessibility_js__["a" /* Accessibility */].ePrivate) ||
            (accessibility == __WEBPACK_IMPORTED_MODULE_0__Accessibility_js__["a" /* Accessibility */].eProtected) ||
            (accessibility == __WEBPACK_IMPORTED_MODULE_0__Accessibility_js__["a" /* Accessibility */].ePublic)) {
            return accessibility
        } else if (accessibility == "public") {
            return __WEBPACK_IMPORTED_MODULE_0__Accessibility_js__["a" /* Accessibility */].ePublic
        } else if (accessibility == "protected") {
            return __WEBPACK_IMPORTED_MODULE_0__Accessibility_js__["a" /* Accessibility */].eProtected
        } else if (accessibility == "private") {
            return __WEBPACK_IMPORTED_MODULE_0__Accessibility_js__["a" /* Accessibility */].ePrivate
        }
    }

}




/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Accessibility; });


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




/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Description; });


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
        if (Array.isArray(this.description)) {
            for (let i = 0; i < this.description.length; i++) {
                if (this.description[i].para) {
                    for (let j = 0; j < this.description[i].para.length; j++) {
                        if (this.description[i].para[j]["_"] == null) {
                            result += "<p>" + this.trim(this.description[i].para[j]) + "</p>"
                        } else {
                            result += "<p>" + this.trim(this.description[i].para[j]["_"]) + "</p>"
                        }
                    }
                }
            }
        } else {
            if (this.description.para) {
                for (let i = 0; i < this.description.para.length; i++) {
                    if (this.description.para[i]["_"] == null) {
                        result += "<p>" + this.trim(this.description.para[i]) + "</p>"
                    } else {
                        result += "<p>" + this.trim(this.description.para[i]["_"]) + "</p>"
                    }
                }
            } else {
                result = this.description
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




/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GroupDocumentation; });


const fs = __webpack_require__(0)
const xml2js = __webpack_require__(1)

/**
  <p>This class stores the details of a group created
     by the \defgroup doxygen command.</p>
*/
class GroupDocumentation {

    constructor() {
        this.name = null
        this.members = [ ]
    }

    readFile(file) {
        let self = this
        return new Promise(function(resolve, reject) {
            fs.readFile(file, function(err, data) {
                if (err) {
                    reject(err)
                } else {
                    let parser = new xml2js.Parser();
                    parser.parseString(data, function (err, result) {
                        self.name = result.doxygen.compounddef[0].compoundname[0]
                        let innerclass = result.doxygen.compounddef[0].innerclass
                        if (innerclass) {
                            for (let i = 0; i < innerclass.length; ++i) {
                                self.members.push(innerclass[i]._)
                            }
                        }
                        resolve()
                    })
                }
            })
        })
    }
}




/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__DoxygenXMLOutput_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__IndexFile_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Description_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ClassDocumentation_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__FunctionDocumentation_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__GroupDocumentation_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Accessibility_js__ = __webpack_require__(5);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "DoxygenXMLOutput", function() { return __WEBPACK_IMPORTED_MODULE_0__DoxygenXMLOutput_js__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "IndexFile", function() { return __WEBPACK_IMPORTED_MODULE_1__IndexFile_js__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Description", function() { return __WEBPACK_IMPORTED_MODULE_2__Description_js__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ClassDocumentation", function() { return __WEBPACK_IMPORTED_MODULE_3__ClassDocumentation_js__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "FunctionDocumentation", function() { return __WEBPACK_IMPORTED_MODULE_4__FunctionDocumentation_js__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "GroupDocumentation", function() { return __WEBPACK_IMPORTED_MODULE_5__GroupDocumentation_js__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Accessibility", function() { return __WEBPACK_IMPORTED_MODULE_6__Accessibility_js__["a"]; });













/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__IndexFile_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ClassDocumentation_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__GroupDocumentation_js__ = __webpack_require__(7);






/**
  <p>This class provides functions to read the XML output produced
     by Doxygen.</p>
  <p>After construction the  {@link DoxygenXMLOutput#initialize} function must be called.</p>
*/
class DoxygenXMLOutput {

    constructor() {
        this.indexFile = new __WEBPACK_IMPORTED_MODULE_0__IndexFile_js__["a" /* IndexFile */]()
    }

    /**
      Initializes the object.
      @param {string} path - The path of the directory where
        the XML output was generated.
    */
    initialize(path) {
        let indexFilePath = path + "/index.xml"
        return this.indexFile.readFile(indexFilePath)
    }

    /**
      Gets the list of classes for which documentation exists.
    */
    getListOfClasses() {
        let result = [ ]
        for (let i = 0; i < this.indexFile.classes.length; ++i) {
            result.push(this.indexFile.classes[i].name)
        }
        return result
    }

    /**
      Reads the file containing the documentation for a given class
      and returns a promise.
      @return {Promise}
    */
    readClassDocumentation(name) {
        let self = this
        let classDocumentation = new __WEBPACK_IMPORTED_MODULE_1__ClassDocumentation_js__["a" /* ClassDocumentation */]()
        return new Promise(function(resolve, reject) {
            classDocumentation.readFile(self.indexFile.getClassDocumentationFile(name))
                .then(function() {
                    resolve(classDocumentation)
                })
        })
    }

    readGroupDocumentation(name) {
        let self = this
        let groupDocumentation = new __WEBPACK_IMPORTED_MODULE_2__GroupDocumentation_js__["a" /* GroupDocumentation */]()
        return new Promise(function(resolve, reject) {
            groupDocumentation.readFile(self.indexFile.getGroupDocumentationFile(name))
                .then(function() {
                    resolve(groupDocumentation)
                })
        })
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = DoxygenXMLOutput;



/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_10__;

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InheritanceRelationship; });


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




/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Parameter; });


class Parameter {

    constructor(type, name) {
        this.type = type
        this.name = name
    }

}




/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return XMLParser; });
/* unused harmony export XMLNode */


const xml2js = __webpack_require__(1)

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





/***/ })
/******/ ]);
});