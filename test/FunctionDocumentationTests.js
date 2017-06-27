'use strict'

var tf = require("ishiko-test-framework")
var doxynode = require("../dist/codesmithy-doxynode.js")

module.exports = function(theTestHarness) {
    let testSequence = theTestHarness.appendTestSequence("FunctionDocumentation tests")

    new tf.FunctionBasedTest("Creation test 1", FunctionDocumentationCreationTest1, testSequence)
    new tf.FunctionBasedTest("Creation test 2", FunctionDocumentationCreationTest2, testSequence)
}

function FunctionDocumentationCreationTest1(resolve, reject)
{
    let outcome = tf.TestResultOutcome.eFailed
    let functiondocumentation = new doxynode.FunctionDocumentation("name1", "public")
    if ((functiondocumentation.name == "name1") &&
        (functiondocumentation.accessibility == doxynode.Accessibility.ePublic)) {
        outcome = tf.TestResultOutcome.ePassed
    }
    resolve(outcome)
}

function FunctionDocumentationCreationTest2(resolve, reject)
{
    let outcome = tf.TestResultOutcome.eFailed
    let functiondocumentation = new doxynode.FunctionDocumentation("name1", doxynode.Accessibility.ePrivate)
    if ((functiondocumentation.name == "name1") &&
        (functiondocumentation.accessibility == doxynode.Accessibility.ePrivate)) {
        outcome = tf.TestResultOutcome.ePassed
    }
    resolve(outcome)
}
