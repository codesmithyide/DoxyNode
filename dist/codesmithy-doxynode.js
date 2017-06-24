(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("fs"), require("xml2js"), require("path"));
	else if(typeof define === 'function' && define.amd)
		define(["fs", "xml2js", "path"], factory);
	else if(typeof exports === 'object')
		exports["CodeSmithyDoxyNode"] = factory(require("fs"), require("xml2js"), require("path"));
	else
		root["CodeSmithyDoxyNode"] = factory(root["fs"], root["xml2js"], root["path"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_6__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


const path = __webpack_require__(6);
const fs = __webpack_require__(1)
const xml2js = __webpack_require__(2)

/**
  <p>This class provides functions to read the index.xml file of the Doxygen XML output.</p>
  <p>After construction the  {@link IndexFile#readFile} function must be called.</p>
*/
class IndexFile {

    constructor() {
        this.path = null
        this.classes = [ ]
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
                                self.classes.push({ name: compound.name, refid: compound["$"].refid })
                            }
                        }
                        resolve()                
                    })
                }
            })
        })
    }

    getClassDocumentationFile(name) {
        let result = null
        for (let i = 0; i < this.classes.length; ++i) {
            if (this.classes[i].name == name) {
                result = path.dirname(this.path) + "/" + this.classes[i].refid + ".xml"
            }
        }
        return result
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = IndexFile;



/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


const fs = __webpack_require__(1)
const xml2js = __webpack_require__(2)

class ClassDocumentation {

    constructor() {
        this.briefdescription = null
        this.detaileddescription = null
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
                        self.briefdescription = result.doxygen.compounddef[0].briefdescription
                        self.detaileddescription = result.doxygen.compounddef[0].detaileddescription
                        resolve()                
                    })
                }
            })
        })
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = ClassDocumentation;



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__DoxygenXMLOutput_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__IndexFile_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ClassDocumentation_js__ = __webpack_require__(3);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "DoxygenXMLOutput", function() { return __WEBPACK_IMPORTED_MODULE_0__DoxygenXMLOutput_js__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "IndexFile", function() { return __WEBPACK_IMPORTED_MODULE_1__IndexFile_js__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ClassDocumentation", function() { return __WEBPACK_IMPORTED_MODULE_2__ClassDocumentation_js__["a"]; });









/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__IndexFile_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ClassDocumentation_js__ = __webpack_require__(3);





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

    getListOfClasses() {
        let result = [ ]
        for (let i = 0; i < this.indexFile.classes.length; ++i) {
            result.push(this.indexFile.classes[i].name)
        }
        return result
    }

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

}
/* harmony export (immutable) */ __webpack_exports__["a"] = DoxygenXMLOutput;



/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ })
/******/ ]);
});