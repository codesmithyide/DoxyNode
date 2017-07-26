'use strict'

// The example refers to the local distribution but when using
// the npm package you would simply require "codesmithy-doxynode.js"
var doxynode = require("../../dist/codesmithy-doxynode.js")

let xmloutput = new doxynode.DoxygenXMLOutput()
xmloutput.initialize("data/xml").then(function() {
    console.log("hello")
})
