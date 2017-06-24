'use strict'

var tf = require("ishiko-test-framework")
var doxynode = require("../dist/codesmithy-doxynode.js")

module.exports = function(theTestHarness) {
    let testSequence = theTestHarness.appendTestSequence("ClassDocumentation tests")

    new tf.FunctionBasedTest("Creation test 1", ClassDocumentationCreationTest1, testSequence)
}

function ClassDocumentationCreationTest1(resolve, reject)
{
    let classdocumentation = new doxynode.ClassDocumentation()
    resolve(tf.TestResultOutcome.ePassed)
}
