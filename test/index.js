'use strict'

var doxynode = require("../dist/codesmithy-doxynode.js")

var tf = require("ishiko-test-framework")
var AddClassDocumentationTests = require("./ClassDocumentationTests.js")
var AddFunctionDocumentationTests = require("./FunctionDocumentationTests.js")
var AddIndexFileTests = require("./IndexFileTests.js")
var AddDoxygenXMLOutputTests = require("./DoxygenXMLOutputTests.js")

let theTestHarness = new tf.TestHarness("codesmithy-doxynode")

theTestHarness.environment.setTestDataDirectory("data")

AddClassDocumentationTests(theTestHarness)
AddFunctionDocumentationTests(theTestHarness)
AddIndexFileTests(theTestHarness)
AddDoxygenXMLOutputTests(theTestHarness)

theTestHarness.run()
