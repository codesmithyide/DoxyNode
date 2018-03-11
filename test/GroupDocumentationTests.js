'use strict'

var tf = require("ishiko-test-framework")
var doxynode = require("../dist/codesmithy-doxynode.js")

module.exports = function(theTestHarness) {
    let testSequence = theTestHarness.appendTestSequence("GroupDocumentation tests")

    new tf.FunctionBasedTest("Creation test 1", GroupDocumentationTest1, testSequence)

    new tf.FunctionBasedTest("readFile test 1", GroupDocumentationReadFileTest1, testSequence)
}

function GroupDocumentationTest1(resolve, reject)
{
    let groupDocumentation = new doxynode.GroupDocumentation()
    resolve(tf.TestResultOutcome.ePassed)
}

function GroupDocumentationReadFileTest1(resolve, reject) {
    let groupdocumentation = new doxynode.GroupDocumentation()
    groupdocumentation.readFile(__dirname + "/data/cpp-group-1/xml/group___shapes.xml")
        .then(function () {
            let outcome = tf.TestResultOutcome.eFailed
            if (groupdocumentation.name === "Shapes") {
                outcome = tf.TestResultOutcome.ePassed
            }
            resolve(outcome)
        })
}
