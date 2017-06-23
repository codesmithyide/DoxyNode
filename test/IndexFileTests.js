'use strict'

var tf = require("ishiko-test-framework")
var doxynode = require("../dist/codesmithy-doxynode.js")

module.exports = function(theTestHarness) {
    let testSequence = theTestHarness.appendTestSequence("IndexFile tests")

    new tf.FunctionBasedTest("Creation test 1", IndexFileCreationTest1, testSequence)
}

function IndexFileCreationTest1()
{
    let indexfile = new doxynode.IndexFile()
    return tf.TestResultOutcome.ePassed
}
