'use strict'

var tf = require("ishiko-test-framework")
var doxynode = require("../dist/codesmithy-doxynode.js")

module.exports = function(theTestHarness) {
    let testSequence = theTestHarness.appendTestSequence("GroupDocumentation tests")

    new tf.FunctionBasedTest("Creation test 1", GroupDocumentationTest1, testSequence)
}

function GroupDocumentationTest1(resolve, reject)
{
    let groupDocumentation = new doxynode.GroupDocumentation()
    resolve(tf.TestResultOutcome.ePassed)
}
