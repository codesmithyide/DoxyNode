'use strict'

var doxynode = require("../dist/codesmithy-doxynode.js")

var tf = require("ishiko-test-framework")
var AddIndexFileTests = require("./IndexFileTests.js")
var AddDoxygenXMLOutputTests = require("./DoxygenXMLOutputTests.js")

let theTestHarness = new tf.TestHarness("codesmithy-doxynode")

theTestHarness.environment.setTestDataDirectory("data")

AddIndexFileTests(theTestHarness)
AddDoxygenXMLOutputTests(theTestHarness)

theTestHarness.run()
