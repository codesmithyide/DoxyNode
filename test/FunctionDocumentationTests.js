'use strict'

var tf = require("ishiko-test-framework")
var doxynode = require("../dist/codesmithy-doxynode.js")

module.exports = function(theTestHarness) {
    let testSequence = theTestHarness.appendTestSequence("FunctionDocumentation tests")

    new tf.FunctionBasedTest("Creation test 1", FunctionDocumentationCreationTest1, testSequence)
}

function FunctionDocumentationCreationTest1(resolve, reject)
{
    let functiondocumentation = new doxynode.FunctionDocumentation()
    resolve(tf.TestResultOutcome.ePassed)
}
