'use strict'

var tf = require("ishiko-test-framework")
var doxynode = require("../dist/codesmithy-doxynode.js")

module.exports = function(theTestHarness) {
    let testSequence = theTestHarness.appendTestSequence("ClassDocumentation tests")

    new tf.FunctionBasedTest("Creation test 1", ClassDocumentationCreationTest1, testSequence)

    new tf.FunctionBasedTest("getListOfFunctions test 1", ClassDocumentationGetListOfFunctionsTest1, testSequence)
}

function ClassDocumentationCreationTest1(resolve, reject)
{
    let classdocumentation = new doxynode.ClassDocumentation()
    resolve(tf.TestResultOutcome.ePassed)
}

function ClassDocumentationGetListOfFunctionsTest1(resolve, reject)
{
    let xmloutput = new doxynode.DoxygenXMLOutput()
    xmloutput.initialize(__dirname + "/data/cpp-code-2/xml")
        .then(function() {
            xmloutput.readClassDocumentation("Polygon")
                .then(function(classDocumentation) {
                    let outcome = tf.TestResultOutcome.eFailed
                    let functions = classDocumentation.getListOfFunctions()
                    if ((functions.length == 1) && (functions[0].name == "draw")) {
                        outcome = tf.TestResultOutcome.ePassed
                    }
                    resolve(outcome)
                })
        })
}
