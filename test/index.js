'use strict'

var doxynode = require("../dist/codesmithy-doxynode.js")

var tf = require("ishiko-test-framework")
var AddFunctionDocumentationTests = require("./FunctionDocumentationTests.js")
var AddClassDocumentationTests = require("./ClassDocumentationTests.js")
var AddDescriptionTests = require("./DescriptionTests.js")
var AddIndexFileTests = require("./IndexFileTests.js")
var AddDoxygenXMLOutputTests = require("./DoxygenXMLOutputTests.js")
var AddGroupDocumentationTests = require("./GroupDocumentationTests.js")

let theTestHarness = new tf.TestHarness("codesmithy-doxynode")

theTestHarness.environment.setTestDataDirectory("data")

AddFunctionDocumentationTests(theTestHarness)
AddClassDocumentationTests(theTestHarness)
AddDescriptionTests(theTestHarness)
AddIndexFileTests(theTestHarness)
AddDoxygenXMLOutputTests(theTestHarness)
AddGroupDocumentationTests(theTestHarness)

theTestHarness.run()
